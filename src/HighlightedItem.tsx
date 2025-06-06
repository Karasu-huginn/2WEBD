import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ArtObject } from "./SearchObjectResult";
import { Calendar, Ruler, ChevronRight } from 'lucide-react';
import './style.css';

interface ResultDataProps {
    objectID: number
}

export function HighlightedItem(props: ResultDataProps) {
    const { objectID } = props
    const { isPending, error, data } = useQuery({
        queryKey: ['object', objectID],
        queryFn: () => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then((response) => response.json() as Promise<ArtObject>),
        placeholderData: keepPreviousData,
    })
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }


    // todo : create card
    if (data.isHighlight) {
        return <>
            <div key={data.accessionNumber} className="card">
                {/* Image Section */}
                <div className="card-image-container">
                    <img
                        src={data.primaryImageSmall || "https://via.placeholder.com/300x200/e2e8f0/64748b?text=No+Image"}
                        alt={data.title}
                        className="card-image"
                    />
                    <div className="card-badge">
                        {data.department}
                    </div>
                    {data.isPublicDomain && (
                        <div className="card-public-domain">
                            Public Domain
                        </div>
                    )}
                </div>

                <div className="card-content">
                    <div className="card-header">
                        <h3 className="card-title">{data.title}</h3>
                        {data.artistDisplayName && (
                            <p className="card-artist">by {data.artistDisplayName}</p>
                        )}
                    </div>

                    {data.message && (
                        <p className="card-message">{data.message}</p>
                    )}

                    <div className="card-details">
                        {data.objectDate && (
                            <div className="card-detail-item">
                                <Calendar size={16} />
                                <span>{data.objectDate}</span>
                            </div>
                        )}
                        {data.dimensions && (
                            <div className="card-detail-item">
                                <Ruler size={16} />
                                <span>{data.dimensions}</span>
                            </div>
                        )}
                        {data.medium && (
                            <div className="card-medium">
                                <span className="card-medium-label">Medium:</span> {data.medium}
                            </div>
                        )}
                    </div>

                    <div className="card-footer">
                        <span className="card-accession">#{data.accessionNumber}</span>
                        <button className="card-button">
                            View Details
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    }
    else {
        return <></>
    }
}