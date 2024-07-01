import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  TextField,
  Divider,
  InlineGrid,
  useBreakpoints,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { useLoaderData, Form } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader() {
  //get data from database
  let settings = {
    name: "My app",
    field1: "My app description1",
    field2: "My app description2",
    field3: "My app description3"
  }
  return json(settings);

}

export async function action({ request }) {
  //update persistent data
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  return json(settings);

}

export default function SettingsPage() {
  const settings = useLoaderData();
  const { smUp } = useBreakpoints();
  const [formState, setFormState] = useState(settings);
  return (
    <Page
      title="Settings page"
      primaryAction={{ content: "Save" }}
      secondaryActions={[
        {
          content: "Discard",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Discard, New settings will not be saved"),
        },
      ]}
    >
      {/* <TitleBar title="Settings page" /> */}
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <Form method="POST">
          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">
                  InterJambs
                </Text>
                <Text as="p" variant="bodyMd">
                  Interjambs are the rounded protruding bits of your puzzlie piece
                </Text>
              </BlockStack>
            </Box>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <TextField label="App name" name="name" value={formState.name} onChange={(value) => setFormState({ ...formState, name: value })} />
                <TextField label="App field 1" name="field1" value={formState.field1} onChange={(value) => setFormState({ ...formState, field1: value })} />
              </BlockStack>
            </Card>
          </InlineGrid>
          {smUp ? <Divider /> : null}
          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">
                  Dimensions
                </Text>
                <Text as="p" variant="bodyMd">
                  Interjambs are the rounded protruding bits of your puzzlie piece
                </Text>
              </BlockStack>
            </Box>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <TextField label="App field 2" name="field2" value={formState.field2} onChange={(value) => setFormState({ ...formState, field2: value })} />
                <TextField label="App field 3" name="field3" value={formState.field3} onChange={(value) => setFormState({ ...formState, field3: value })} />
              </BlockStack>
            </Card>
          </InlineGrid>
          <Button submit={true}>Save </Button>
        </Form>
      </BlockStack>
    </Page>
  );
}
