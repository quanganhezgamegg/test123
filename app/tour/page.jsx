import FilterSidebar from "../component/tour/FilterSidebar";
import DestinationList from "../component/tour/DestinationList";
export default function DestinationPage() {
    return (<>  
      <main className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">
        <h1 className="text-3xl font-bold mb-8 text-center">Khám phá điểm đến</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <FilterSidebar />
          <div className="flex-1">
            <DestinationList />
          </div>
        </div>
      </main>
    </>
    );
  }