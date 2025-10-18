'use client'

import HeroSection from './HeroSection'
import StorySection from './StorySection'
import MissionAndValues from './MissionAndValues'
import MeetOurTeam from './MeetOurTeam'
import RequestDemo from './RequestDemo'
import ImpactAndStatistic from './ImpactAndStatistics'
import Loader from '@/app/components/Loader/Loader'
import LoaderConfig from '@/app/config/LoaderConfig'
import { useState, useEffect } from 'react'

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader config={LoaderConfig.about} />;
  }

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