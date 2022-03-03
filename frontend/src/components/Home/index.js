import EventGallery from './EventGallery';

import './Home.css';

function Home() {
    const categories = ['All', 'Fitness', 'Sports', 'Music', 'Food', 'Movies', 'Party'];

    return (
        <div id='home'>
            <div id='popular-div'>
                <h1>Popular in</h1>
                <form>
                    <input type='text'></input>
                    <button>G</button>
                </form>
            </div>
            <ul>
                { categories.map((category, idx) => <li key={idx.toString()}>{category}</li>) }
            </ul>
            <EventGallery />
        </div>
    );
}

export default Home;
