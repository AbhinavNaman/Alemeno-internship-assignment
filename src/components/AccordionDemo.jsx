import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function AccordionDemo({data}) {
  return (
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>{data}</AccordionTrigger>
    <AccordionContent>
      {data}
    </AccordionContent>
  </AccordionItem>
</Accordion>

  );
}

