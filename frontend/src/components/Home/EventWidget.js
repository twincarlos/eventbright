import './Home.css';

function EventWidget({ event }) {
    return (
        <div className='event-widget'>
            <p>Name: {event.name}</p>
            <p>Venue: {event.venue}</p>
            <p>Category: {event.category}</p>
            <p>Where: {event.state}, {event.city}</p>
        </div>
    );
}

export default EventWidget;
