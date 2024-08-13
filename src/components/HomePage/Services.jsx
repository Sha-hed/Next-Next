// import { services } from '../../lib/services.js'
import { getServices } from '@/services/getServices';
import ServiceCard from '../Cards/ServiceCard';

// const getServices = async()=>{
//     const res = await fetch('http://localhost:3000/services/api/get-all')
//     const data = res.json();
//     return data;
// }

const Services = async () => {
    const services = await getServices();
    console.log(services);
    return (
        <div className="text-slate-900 min-h-screen max-w-7xl mx-auto mt-12">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>The majority have suffered alteration in some form, by injected humour</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 ga[-6">
                {
                    services?.map((service, id) => <ServiceCard
                        key={service._id}
                        service={service}>
                    </ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;