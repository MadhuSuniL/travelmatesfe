import { Tabs } from 'flowbite-react';
import { BiCalendarEvent, BiCheckCircle } from 'react-icons/bi';
import TripPublicCard from '../../Trips/Cards/TripPublicCard';



function TripTabs() {
  return (
    <Tabs aria-label="Tabs with underline" className='justify-around border-0' style="underline">
      <Tabs.Item active title="Upcoming Trips" icon={BiCalendarEvent}>
        <div className='p-2 grid grid-cols-1 gap-2 overflow-auto h-screen pb-44'>
          <TripPublicCard/>
          <TripPublicCard/>
          <TripPublicCard/>
          <TripPublicCard/>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Completed Trips" icon={BiCheckCircle}>
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
    </Tabs>
  );
}

export default TripTabs