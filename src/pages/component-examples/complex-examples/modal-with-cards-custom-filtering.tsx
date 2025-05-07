import { useEffect, useState } from "react"
import { Align } from "@new/Stack/Align"
import { Stack } from "@new/Stack/Stack"
import { PageBounds } from "@new/PageBounds/PageBounds"
import ResetStyles from "../internal/ResetStyles"
import { InputButtonPrimary } from "@new/InputButton/InputButtonPrimary"
import { Dialog } from "@new/Dialog/Dialog"
import { Size } from "@new/Size"
import { Text } from "@new/Text/Text"
import { Color } from "@new/Color"
import { Grid } from "@new/Grid/Grid"
import { OverflowContainer } from "@new/OverflowContainer/OverflowContainer"
import { Spacer } from "@new/Stack/Spacer"
import { InputTextSingle } from "@new/InputText/InputTextSingle"
import { Icon } from "@new/Icon/Icon"

type Category = {
  id: number
  label: string
  items: Item[]
}

type Item = {
  id: number
  label: string
  description: string
}

export default () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [categories] = useState<Category[]>([
    {
      id: 0,
      label: "Templates",
      items: [
        {
          id: 0,
          label: "Consumption dahsboard",
          description: "Create a dashboard to monitor energy consumption, waste, and emissions.",
        },
        {
          id: 1,
          label: "Data collection dashboard",
          description: "Create a dashboard to monitor question answer-rate and tracking of individual answer rates.",
        },
        {
          id: 2,
          label: "Another dashboard",
          description: "This is a description of another dashboard.",
        },

        {
          id: 3,
          label: "Yet another dashboard",
          description: "This is a description of another dashboard.",
        },
      ],
    },

    {
      id: 0,
      label: "Start from scratch",
      items: [
        {
          id: 0,
          label: "Blank dashboard",
          description: "Create a blank dashboard without any widgets",
        },
      ],
    },
  ])

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }))

  const pickItem = (item: Item) => {
    console.log(item)

    setDialogOpen(false)
  }

  useEffect(() => {
    setDialogOpen(true)
  }, [])

  return (
    <>
      <PageBounds>
        <Stack horizontal>
          <Align horizontal left>
            <InputButtonPrimary
              size="small"
              width="auto"
              label="Open Modal"
              onClick={() => setDialogOpen(!dialogOpen)}
            />
          </Align>
        </Stack>

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          size={Size.Large}
          title={
            <Text fill={[Color.Neutral, 700]} medium>
              <b>Create new dashboard</b>
            </Text>
          }
          description={
            <Text fill={[Color.Neutral, 700]} small wrap>
              Choose a template or crate a new dashboard from scratch
            </Text>
          }
          content={
            <OverflowContainer colorBackground={[Color.White]} colorForeground={Color.Neutral} axes="vertical">
              <Stack vertical hug textHighlight={searchTerm}>
                <Align vertical left>
                  <InputTextSingle
                    size="large"
                    width="auto"
                    color={Color.Neutral}
                    label={["inside", "Search"]}
                    iconNameLeft="search"
                    placeholder="Search for a template"
                    value={searchTerm}
                    onChange={value => setSearchTerm(value)}
                  />

                  <Spacer large />

                  {filteredCategories.flatMap(fc => fc.items).length > 0 ? (
                    filteredCategories.map((category, categoryIndex) => (
                      <>
                        <Stack key={category.id} vertical hug>
                          <Align horizontal left>
                            <Text fill={[Color.Neutral, 400]} xsmall>
                              {category.label}
                            </Text>
                          </Align>

                          <Spacer small />

                          <Align vertical left>
                            <Grid columns="three">
                              {category.items.map(item => (
                                <Stack
                                  key={item.id}
                                  horizontal
                                  stroke={[Color.Neutral, 100]}
                                  strokeHover={[Color.Neutral, 300]}
                                  onClick={() => pickItem(item)}
                                  cornerRadius="large"
                                >
                                  <Align vertical left hug="width">
                                    <Icon name="science" large fill={[Color.Primary, 700]} />
                                  </Align>

                                  <Spacer medium />

                                  <Stack horizontal hug>
                                    <Align vertical topLeft>
                                      <Text fill={[Color.Neutral, 700]} small wrap>
                                        <b>{item.label}</b>
                                      </Text>

                                      <Spacer small />

                                      <Text fill={[Color.Neutral, 400]} small wrap>
                                        {item.description}
                                      </Text>
                                    </Align>
                                  </Stack>
                                </Stack>
                              ))}
                            </Grid>
                          </Align>
                        </Stack>

                        {categories.length - 1 > categoryIndex && <Spacer large />}
                      </>
                    ))
                  ) : (
                    <Text fill={[Color.Neutral, 700]} small>
                      Nothing found.
                    </Text>
                  )}
                </Align>
              </Stack>
            </OverflowContainer>
          }
        />
      </PageBounds>

      <ResetStyles />
    </>
  )
}
