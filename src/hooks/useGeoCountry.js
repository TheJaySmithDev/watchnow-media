import { useState, useEffect } from 'react'

// Hook: uses GPS to get lat/lon then reverse-geocodes to country code (ISO alpha-2 uppercase).
// Uses Nominatim free endpoint; replace in production with a paid/reliable reverse-geocode service.
export default function useGeoCountry() {
  const [countryCode, setCountryCode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function probe() {
      setLoading(true)
      if (!navigator.geolocation) {
        setError('Geolocation not supported')
        setCountryCode('US')
        setLoading(false)
        return
      }

      navigator.geolocation.getCurrentPosition(async (pos) => {
        if (cancelled) return
        const { latitude, longitude } = pos.coords
        try {
          // Nominatim reverse geocode
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          if (!res.ok) throw new Error('Reverse geocode failed')
          const json = await res.json()
          const cc = (json.address && json.address.country_code) ? json.address.country_code.toUpperCase() : null
          setCountryCode(cc || 'US')
        } catch (err) {
          console.warn('Reverse geocode error', err)
          setError('Reverse geocode failed')
          setCountryCode('US')
        } finally {
          setLoading(false)
        }
      }, (err) => {
        console.warn('Geolocation error', err)
        setError(err.message || 'Geolocation denied')
        setCountryCode('US')
        setLoading(false)
      }, { enableHighAccuracy: true, timeout: 8000 })
    }

    probe()
    return () => { cancelled = true }
  }, [])

  return { countryCode, loading, error }
}