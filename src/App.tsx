import { Button } from "./components/ui/button"
import { Link } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Helmet } from "react-helmet"
import Rive from '@rive-app/react-canvas'
import Illustration from "./assets/hero-illustration.riv"

function App() {
  return (
    <>
      <Helmet>
        <title>Theorix - Learn musical concepts the easy way</title>
        <meta name="description" content="Theorix improves your ability to read and write sheet music by offering easy to use tools." />
      </Helmet>
      <section className="w-full mb-10 lg:flex justify-between flex-row-reverse lg:mt-14">
          <div className="flex align-center w-full h-auto aspect-[2/1] lg:w-[40%]">
            <Rive
              className="h-auto w-full invert-stave"
              src={Illustration}
              stateMachines="bumpy"
            />
          </div>
          <div className="lg:mr-[10%]">
            <h1 className="text-3xl font-semibold lg:text-5xl lg:max-w-[18ch] lg:leading-[1.1]">Learn music theory the easy way.</h1>
            <p className="mt-3 mb-5 lg:mt-5 lg:mb-6 lg:max-w-[45ch] text-lg">Explore music theory basics with clear explanations and interactive exercises. Perfect for all skill levels — get started now!</p>
            <Button className="py-5 text-base lg:px-6 lg:py-[1.375rem]" asChild>
              <Link to="/interval-identification">Start learning</Link>
            </Button>
          </div>
      </section>
      <div className="lg:flex lg:justify-between lg:align-center">
        <div className="lg:mr-[11%]">
          <h2 className="pt-7 text-2xl font-semibold lg:mt-12 lg:pt-0">Our tools</h2>
          <section className="mt-4">
            <h3 className="text-lg font-semibold">Metronome</h3>
            <p className="pb-2">Set your own tempo, practice rhythm and timing at your own pace.</p>
            <Link to="/metronome" className="font-semibold">Check it out</Link>
          </section>
          <section className="mt-8">
            <h3 className="text-lg font-semibold">Musical Terms</h3>
            <p className="pb-2">Look up any musical term, symbol or abbreviation.</p>
            <Link to="/musical-terms" className="font-semibold">Check it out</Link>
          </section>
        </div>
      <div>
        <div className="lg:mr-[11%]">
          <h2 className="mt-12 text-2xl font-semibold">Latest tutorials</h2>
          <section className="mt-4">
            <h3 className="text-lg font-semibold">Interval Identification</h3>
            <p className="pb-2">Learn how to measure intervals, one of the most important concepts of music theory.</p>
            <Link to="/interval-identification" className="font-semibold">Check it out</Link>
          </section>
          <section className="mt-8">
            <h3 className="text-lg font-semibold">Chord Identification</h3>
            <p className="pb-2">Learn how to create and determine chords by reading this article.</p>
            <Link to="/chord-identification" className="font-semibold">Check it out</Link>
          </section>
        </div>
      </div>
      </div>
      <section className="pt-10 mt-4 lg:mt-20">
        <section>
          <h4 className="text-2xl font-semibold mb-2 lg:text-center">What is different about theorix?</h4>
          <p className="leading-relaxed lg:text-center lg:max-w-[45ch] lg:m-auto">theorix provides detailed and easy to understand tutorials about music theory like chords and intervals and tools like a metronome.</p>
        </section>
        <Accordion type="single" collapsible className="w-full lg:w-[50%] mt-4 lg:mt-6 lg:block lg:m-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-normal leading-relaxed">When should I use theorix?</AccordionTrigger>
            <AccordionContent className="text-base font-normal leading-relaxed">You should use theorix when you just started learning music theory. I suggest you start with intervals and then go on to chords because chords are made of intervals.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-normal leading-relaxed">What tools does theorix offer?</AccordionTrigger>
            <AccordionContent className="text-base font-normal leading-relaxed">We offer a metronome and a dictionary with terms used in sheet music like accelerando or decrescendo. In the future I want to add other tools like an interactive circle of fifths.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-normal leading-relaxed">Is it free to use?</AccordionTrigger>
            <AccordionContent className="text-base font-normal leading-relaxed">Yes. theorix is free to use. But if you want to say thank you, feel free to <Link to="https://ko-fi.com/theorix" className="underline">donate</Link>.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  )
}

export default App