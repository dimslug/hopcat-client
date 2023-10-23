import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Table, Tooltip, Button, Collapse } from 'reactstrap'
import { baseURL } from "../../environments";

function UpcomingPromos() {
    const navigate = useNavigate();

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const [isOpen, setIsOpen] = useState(false);
    const showMore = () => setIsOpen(!isOpen)

    const [status, setStatus] = useState(false);

    const onEntering = () => setStatus(true);
    const onEntered = () => setStatus(true);
    const onExiting = () => setStatus(false);
    const onExited = () => setStatus(false);

    const [promosData, setPromosData] = useState([])

    // fetch promo data from backend and map over it to populate table

    const fetchPromos = async () => {
        const url = `${baseURL}/promo/upcoming/bydate`;

        const requestOptions = {
            method: 'GET',
            headers: new Headers({

                "Authorization": `${localStorage.getItem('token')}`,
            })
        }

        try {
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            console.log(data)
            setPromosData(data.results)
            console.log(promosData)

        } catch (err) {
            console.log(err.message)
        }

    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchPromos();
        }
    }, [localStorage.getItem('token')])

    return (
        <>
            <h2>Upcoming Events</h2>

            <Table
                hover
                borderless
                responsive
                size="sm"
            >
                <tbody>
                    {
                        promosData.slice(0,5).map((promos) => {
                            const startDateFormatter = new Date(promos.startDate);
                            const startDateFomatted = startDateFormatter.toLocaleDateString(
                                "en-US",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            );
                            return (
                                <tr
                                    onClick={() => navigate(`/displayPromo/${promos._id}`)}
                                    id='target'
                                >
                                    <td>{promos.drinkID.name}</td>
                                    <td>{promos.drinkID.description}</td>
                                    <td>{promos.creatorID.firstName + " " + promos.creatorID.lastName}</td>
                                    <td>{startDateFomatted}</td>
                                    <Tooltip
                                        isOpen={tooltipOpen}
                                        target='target'
                                        toggle={toggle}
                                    > <img src="https://placehold.co/200" alt="" />
                                    </Tooltip>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            <Button onClick={showMore} style={{ alignSelf: 'center' }} hidden={status}>
                Show More
            </Button>
            <Collapse
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited}
                isOpen={isOpen}>
                <Table
                    hover
                    responsive
                    borderless
                    size="sm"
                >
                    <tbody>
                    {
                        promosData.slice(5,10).map((promos) => {
                            const startDateFormatter = new Date(promos.startDate);
                            const startDateFomatted = startDateFormatter.toLocaleDateString(
                                "en-US",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            );
                            return (
                                <tr
                                onClick={() => navigate(`/displayPromo/${promos._id}`)}
                                    id='target'
                                >
                                    <td>{promos.drinkID.name}</td>
                                    <td>{promos.drinkID.description}</td>
                                    <td>{promos.creatorID.firstName + " " + promos.creatorID.lastName}</td>
                                    <td>{startDateFomatted}</td>
                                    <Tooltip
                                        isOpen={tooltipOpen}
                                        target='target'
                                        toggle={toggle}
                                    > <img src="https://placehold.co/200" alt="" />
                                    </Tooltip>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </Table>
                <Button onClick={showMore} style={{ alignSelf: 'center' }} hidden={!status}>
                    Show Less
                </Button>
            </Collapse>



        </>
    )
}

export default UpcomingPromos