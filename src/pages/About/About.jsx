import React from 'react'
import AccordionComp from './AccordionComp'

function About() {
  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden bg-gray-200">
    <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-gray-700">About</span>
            {/* <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span> */}
            </div>
            <div className="md:flex-grow">
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Carreturn.co.uk - place where you can report your stolen vehicle.</h2>
            <p className="leading-relaxed">Carreturn.co.uk solves the issue, by reporting on our website, reports gets seen on google by just simply typing a Registration Number which would bring up your stolen vehicle report post and allows you to send an email to the owner "Hey, I have came across your car, parked up on my street, please contact me on 0751xxxxxx"</p>
            </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-gray-700">Vision</span>
            {/* <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span> */}
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">How do I find out if a car is stolen?</h2>
                <p className="leading-relaxed">Most of cars gets stolen and parked up few miles away  still on original number plates to check if owner have had a tracker installed, thieves come back to the car next day to take it to the so called chop shops. You would be surprised how many people walk past a stolen car on the street not knowing it is stolen.</p>
            </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-gray-700">FAQ</span>
            {/* <span className="text-sm text-gray-500">12 Jun 2019</span> */}
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Some Frequently asked Questions</h2>
                <AccordionComp />
                {/* <p className="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p> */}
            </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-gray-700">Message</span>
            {/* <span className="text-sm text-gray-500">12 Jun 2019</span> */}
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">One step for safe world</h2>
                <p className="leading-relaxed">Welcome to our website dedicated to helping victims of car theft report their stolen vehicles. Car theft is a serious crime that can cause significant financial and emotional stress for its victims. We understand the frustration and stress that comes with having your car stolen, and we aim to make the reporting process as simple and efficient as possible. <br /> At our website, we believe that by working together, we can reduce the number of car thefts and create a safer environment for all. Thank you for visiting our website, and we hope to provide you with the help you need during this difficult time.</p>
            </div>
        </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default About