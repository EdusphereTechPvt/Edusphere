import Image from 'next/image'

import CardComponent from '@/components/CardComponent/Index'

export default function ImpactAndStatistic() {
  const stats = [
    {
      type: "generic",
      title: "+45%",
      role: "Increase in Student Engagement"
    },
    {
      type: "generic",
      title: "92%",
      role: "Teacher Satisfaction Rate"
    },
    {
      type: "generic",
      title: "98%",
      role: "School Retention Rate"
    }
  ]

  const testimonials = [
    {
      type: "testimonial",
      content: "This app is amazing!",
      avatar: "https://avatar.iran.liara.run/public/18",
      name: "Name 1",
      desc: "Role 1",
    },
    {
      type: "testimonial",
      content: "Love this app, it has transformed my learning experience!",
      avatar: "https://avatar.iran.liara.run/public/19",
      name: "Name 2",
      desc: "Role 2",
    },
    {
      type: "testimonial",
      content: "Wow, this app is really helpful for my studies!",
      avatar: "https://avatar.iran.liara.run/public/20",
      name: "Name 3",
      desc: "Role 3",
    },
  ]

  return (
    <section className="py-16 px-6 text-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-12 text-black">
        Impact and Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, i) => (
          <CardComponent
            key={i}
            data={stat}
          />
        ))}
      </div>



      <div className="flex items-center justify-center my-16">
        <Image
          src="https://placehold.co/600x400"
          alt="Statistic Illustration"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-bold mb-12 text-black">
        From Our Community
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        {testimonials.map((testimonial, i) => (
          <CardComponent
            key={i}
            data={testimonial} 
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-2xl transition duration-200"
          />
        ))}
      </div>
    </section>
  )
}