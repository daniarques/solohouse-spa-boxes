import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin, useMap} from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import {BoxData} from "./model/BoxData.ts";
import {Circle} from "./Circle.tsx";

interface Bounds {
    minLatitude: number,
    maxLatitude: number,
    minLongitude: number,
    maxLongitude: number
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
                    style={{height: '80vh'}}
                >
                    <PinsClickable boxes={boxes}/>
                </Map>
            </APIProvider>
        </>
    )
}

const PinsClickable = (props: { boxes: BoxData[] }) => {
    const map = useMap();
    const [circleCenter, setCircleCenter] = useState<google.maps.LatLng>()

    const handleMarkerClick = (ev: google.maps.MapMouseEvent) => {
        console.log(ev.latLng)
        if (!map) return;
        if (!ev.latLng) return;
        console.log("clicked")
        map.panTo(ev.latLng);
        setCircleCenter(ev.latLng);
    };
    return (<>
            <Circle
                radius={800}
                center={circleCenter}
                strokeColor={'#0c4cb3'}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={'#3b82f6'}
                fillOpacity={0.3}
            />
            {props.boxes.map((box: BoxData) => (
                <AdvancedMarker
                    key={box.id}
                    position={{lat: box.location.latitude, lng: box.location.longitude}}
                    clickable={true}
                    onClick={handleMarkerClick}
                >
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>
                </AdvancedMarker>

            ))}
        </>
    );
}

export default BoxesMap
