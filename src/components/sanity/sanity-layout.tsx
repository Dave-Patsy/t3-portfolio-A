
import { Stack, Card, Flex, Text, } from "@sanity/ui";

/* eslint-disable */
export default function MyActiveToolLayout(props: { renderDefault: (arg0: any) => any; }) {

  return (
    <div className="h-full">
      <>{props.renderDefault(props)}</>
    </div>
  );
}
/* eslint-disable */
