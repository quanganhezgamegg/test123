// components/destination/DestinationCard.jsx
import Image from "next/image";
import Link from "next/link";


export default function DestinationCard({ destination }) {
  return (
    <Link href={`/tour/${destination.slug}`} className="block">
    <div  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <Image
        src={destination.image}
        alt={destination.name}
        width={400}
        height={250}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{destination.name}</h3>
        <p className="text-sm text-gray-600 mt-2">{destination.description}</p>
        <span className="block mt-3 font-semibold text-blue-600">{destination.price}</span>
      </div>
    </div>
    </Link>
  );
}
