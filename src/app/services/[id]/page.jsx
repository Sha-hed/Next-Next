import { getServicesDetails } from "@/services/getServices";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: 'Car Details',
    description: 'Service Details Page!'
}

const page = async ({ params }) => {
    const service = await getServicesDetails(params.id);
    const { _id, title, img, price, description, facility } = service
    console.log(service);
    return (
        <div>
            Service Details of {title}
            <Link className="btn btn-primary" href={`/checkout/${_id}`}>CheckOut Form</Link>
            
        </div>
    );
};

export default page;