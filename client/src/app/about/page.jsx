'use client'

import HeroSection from './HeroSection'
import StorySection from './StorySection'
import MissionAndValues from './MissionAndValues'
import MeetOurTeam from './MeetOurTeam'
import ImpactAndStatistic from './ImpactAndStatistic'
import RequestDemo from './RequestDemo'

const page = () => {
  return (
    <div className="flex flex-col">

      <HeroSection
        title="Empowering Educators, Inspiring Students"
        subtitle="Edusphere is dedicated to transforming education through innovative technology solutions. We provide schools with the tools they need to create engaging, effective learning environments."
        buttonText="Learn More"
        imageUrl="https://placehold.co/1200x800"
        onButtonClick={() => alert("Learn more!")}
      />

      <StorySection />

      <MissionAndValues />

      <MeetOurTeam/>

      <ImpactAndStatistic/>

      <RequestDemo/>

    </div>
  )
}

export default page
