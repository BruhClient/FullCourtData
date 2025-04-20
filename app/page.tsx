
import ConferenceStandings from "@/components/Standings";
import UpcomingGames from "@/components/UpcomingGames";







export default function Home() {

  
  return (
    <div className="px-3 flex flex-col items-center w-full gap-3 py-5">
      
        <UpcomingGames />
        <ConferenceStandings />
        
     
      

     
      
      
    </div>
  );
}
