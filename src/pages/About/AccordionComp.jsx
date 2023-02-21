import {Accordion, AccordionItem,AccordionItemHeading,AccordionItemButton,AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
function AccordionComp() {
  const Faq = [
    { id:1,
      faq:'What should I do if my car has been stolen?',
      ans:'If your car has been stolen, you should report it to the police immediately. You can also report the theft online through our car stolen reporting website, which will provide the police with important information about your stolen vehicle.'
    },
    {id:2,
      faq:'What information will I need to provide when reporting a stolen car online?',
      ans:'When reporting a stolen car online, you will need to provide the make, model, year, and license plate number of the vehicle, as well as any distinguishing features or modifications. You will also need to provide your contact information and a police report number if you have already filed a report.'
    },
    {
      id:3,
      faq:'How long will it take for the police to locate my stolen car?',
      ans:'The amount of time it takes to locate a stolen car can vary depending on a number of factors, including the location of the theft, the amount of information available, and the resources of the local police department. While we cannot guarantee that your car will be located, we will do our best to provide the police with all the information they need to help them in their search.'
    }
    ,
    {
      id:4,
      faq:'What can I do to prevent my car from being stolen in the future?',
      ans:'There are several steps you can take to help prevent your car from being stolen, including parking in well-lit areas, locking your doors and windows, using a steering wheel lock or other anti-theft device, and keeping valuables out of sight. You can also consider installing a tracking device that can help locate your car if it is stolen.'
    }
    ,
    {
      id:5,
      faq:'Will my insurance cover the cost of a stolen car?',
      ans:'Your insurance policy may provide coverage for a stolen car, but it will depend on the specific terms of your policy. You should contact your insurance provider as soon as possible after reporting the theft to the police to discuss your coverage and any next steps.'
    }
    ,
    {id:6,
      faq:'Can I report a stolen car even if I don`t have the license plate number?',
      ans:'Yes, you can still report a stolen car even if you don`t have the license plate number. However, having this information can be helpful in locating the vehicle and identifying it if it is recovered. You should provide as much information as possible when reporting the theft, including the make, model, year, color, and any identifying features'
    }
    ,
    {
      id:7,
      faq:'Will the police contact me if my stolen car is recovered?',
      ans:'Yes, the police should contact you if your stolen car is recovered. However, you should also stay in contact with the police department and follow up on the status of your report. If your car is recovered, you may need to provide proof of ownership and/or insurance before it can be released to you.'
    }
    ,
    {
      id:8,
      faq:'What should I do if I find my stolen car before the police do?',
      ans:'If you find your stolen car before the police do, you should still report the recovery to the police and follow their instructions. It is important to remember that the people who stole your car may still be in possession of it, and it is not safe to confront them on your own.'
    }
    ,
    {
      id:9,
      faq:'Can I offer a reward for information leading to the recovery of my stolen car?',
      ans:'Yes, you can offer a reward for information leading to the recovery of your stolen car. However, you should be cautious when offering a reward and follow the advice of the police. You should also be prepared to follow through on your promise of a reward if someone provides information that leads to the recovery of your vehicle.'
    }
    ,
    {id:10,
      faq:'How long does it take for a stolen car report to be processed?',
      ans:'The time it takes for a stolen car report to be processed can vary depending on the policies and procedures of the police department. You should follow up with the department if you have not heard anything within a reasonable amount of time. Remember to provide accurate and complete information when making the report to help ensure that it is processed as quickly and efficiently as possible.'
    }
  ]
  return (
    <>
      <Accordion allowZeroExpanded>
        {Faq.map((faq ,index)=>{
        return (
            <AccordionItem key={faq.id}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        {faq.faq}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        {faq.ans}
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            )
        })}
      
      </Accordion>
    </>
  )
}

export default AccordionComp