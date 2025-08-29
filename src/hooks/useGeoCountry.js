import { useEffect, useState } from 'react'

// Simple hook: tries to get user's country via geolocation + reverse geocode (Nominatim)
// Falls back to 'US' if permission denied or error.
export default function useGeoCountry(){
  const [country, setCountry] = useState('US')
  useEffect(()=>{
    if (!navigator.geolocation) return
    let mounted = true
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try{
        const { latitude, longitude } = pos.coords
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        const r = await fetch(url)
        const j = await r.json()
        if (!mounted) return
        const cc = (j.address && (j.address.country_code || j.address.country)) || 'US'
        setCountry((typeof cc === 'string' && cc.length===2) ? cc.toUpperCase() : cc)
      }catch(e){
        // ignore and keep default
      }
    }, ()=>{}, {timeout:5000})
    return ()=>{ mounted=false }
  },[])
  return country
}