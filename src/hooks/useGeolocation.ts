'use client'

import { useEffect, useRef, useState } from "react";

const useGeolocation = () => {
    const [coordinates, setCoordinates] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null })
    const [permission, setPermission] = useState<PermissionState | ''>('')
    const [error, setError] = useState(() =>
        'geolocation' in navigator && 'permissions' in navigator
            ? ''
            : 'API de Geolocation não disponível'
    )

    const watchId = useRef<number | null>(null)

    useEffect(() => {
        const onSuccess = (position: GeolocationPosition) => {
            setCoordinates({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
             })
        }

        const onError = (error: GeolocationPositionError) =>{
            const errorMsg = 'Ops! Alguma coisa deu errado'
            console.log(errorMsg)
            console.error(error)
            setError(`[handlePermissionChange] :: [onError] - ${errorMsg}`)
        }

        const handlePermissionChange = (status: PermissionStatus) => {
            setPermission(status.state)

            if(status.state == 'denied'){
                alert('Localização negada!')
            }

            if(status.state == 'granted' || status.state == 'prompt'){
                watchId.current = navigator.geolocation.watchPosition(onSuccess, onError)
            }
        }

        if ('geolocation' in navigator && 'permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' })
                .then((status) =>{
                    handlePermissionChange(status)
                })
        }

        return () => {
            if(watchId.current){
                navigator.geolocation.clearWatch(watchId.current)
            }
        }

    }, [])

    return { coordinates, permission, error }
}

export default useGeolocation