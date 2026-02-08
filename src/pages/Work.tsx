import { Gallery } from '../components/sections/Gallery';
import { Contact } from '../components/sections/Contact';

export function Work() {
    return (
        <div className="pt-20">
            <div className="px-4 md:px-10 mb-10">
                <h1 className="font-display font-black text-6xl md:text-9xl uppercase">Selected<br />Works</h1>
            </div>
            <Gallery />
            <Contact />
        </div>
    );
}
