import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import {BoxData} from "./model/BoxData.ts";
import {MapCameraChangedEvent} from "@vis.gl/react-google-maps/src/components/map/use-map-events.ts";

interface Poi {
    key: number,
    location: google.maps.LatLngLiteral
}

interface Bounds {
    minLatitude: number,
    maxLatitude: number,
    minLongitude: number,
    maxLongitude: number
}

function toPoi(box: BoxData): Poi {

    return {
        key: box.id,
        location: {
            lat: box.location.latitude,
            lng: box.location.longitude
        }
    }
}


const BoxesMap = () => {
    const [boxes, setBoxes] = useState<BoxData[]>([]);
    const [bounds, setBounds] = useState<Bounds>({
        minLatitude: 37.888339995212924,
        maxLatitude: 41.35665168203299,
        minLongitude: -0.40412379668191445,
        maxLongitude: 6.2371115548805856
    });
    const [temporalBounds, setTemporalBounds] = useState<Bounds>()


    const temporalBoundsReload = (ev: MapCameraChangedEvent) => {
        console.log("bound moved event", ev)
        setTemporalBounds({
            minLatitude: ev.detail.bounds.south,
            maxLatitude: ev.detail.bounds.north,
            minLongitude: ev.detail.bounds.west,
            maxLongitude: ev.detail.bounds.east
        })
    }
    useEffect(() => {
        (async () => {

                const apiUrl = "http://localhost:8080/boxes?" + new URLSearchParams({
                    minLatitude: bounds.minLatitude.toString(),
                    maxLatitude: bounds.maxLatitude.toString(),
                    minLongitude: bounds.minLongitude.toString(),
                    maxLongitude: bounds.maxLongitude.toString()
                }).toString();
                try {
                    console.log("calling fetch")
                    const res = await fetch(apiUrl);
                    const data = await res.json() as BoxData[];
                    setBoxes(data);
                } catch (error) {
                    console.log('Error fetching data', error);
                } finally {
                    //setLoading(false);
                }
            }
        )();
    }, [bounds])
    const handleClick = (ev: google.maps.MapMouseEvent) => {
        console.log('marker clicked: ', ev);
    };
    return (
        <>
            <APIProvider apiKey={'AIzaSyAxZvucD3xWoMDnkri4JWGO_GmDLhcH40E'}>
                <Map
                    defaultZoom={6}
                    defaultBounds={{
                        south: 37.888339995212924,
                        north: 41.35665168203299,
                        west: -0.40412379668191445,
                        east: 6.2371115548805856
                    }}
                    onBoundsChanged={temporalBoundsReload}
                    onDragend={() => {
                        if (temporalBounds) {
                            setBounds(temporalBounds)
                        }
                    }
                    }
                    onZoomChanged={() => {
                        //TODO: If event is zoom in, not necessary call
                        if (temporalBounds) {
                            setBounds(temporalBounds)
                        }
                    }
                    }
                    mapId='boxesMap'
                    style={{height: '90vh'}}
                >
                    {boxes.map((box: BoxData) => (

                        <AdvancedMarker
                            key={box.id}
                            position={{lat: box.location.latitude, lng: box.location.longitude}}
                            clickable={true}
                            onClick={handleClick}
                        >
                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>
        </>
    )
}

export default BoxesMap
