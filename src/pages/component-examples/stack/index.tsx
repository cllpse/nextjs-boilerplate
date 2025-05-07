import { useState } from "react"
import { Align } from "@new/Stack/Align"
import { Text } from "@new/Text/Text"
import { Color } from "@new/Color"
import { Spacer } from "@new/Stack/Spacer"
import { OverflowContainer } from "@new/OverflowContainer/OverflowContainer"
import { Icon } from "@new/Icon/Icon"
import { Grid } from "@new/Grid/Grid"
import { Stack } from "@new/Stack/Stack"
import LoadingDisabled from "../internal/LoadingDisabled"
import { PageBounds } from "@new/PageBounds/PageBounds"
import ResetStyles from "../internal/ResetStyles"
import { InputButtonIconTertiary } from "@new/InputButton/InputButtonIconTertiary"
import { InputButtonTertiary } from "@new/InputButton/InputButtonTertiary"
import { InputButtonPrimary } from "@new/InputButton/InputButtonPrimary"
import { Divider } from "@new/Divider/Divider"
import { InputTextSingle } from "@new/InputText/InputTextSingle"
import { InputCombobox } from "@new/InputCombobox/InputCombobox"
import { InputComboboxItem } from "@new/InputCombobox/InputComboboxItem"
import { InputCheckbox } from "@new/InputCheckbox/InputCheckbox"

const TEXTHEADING = () => (
  <Text medium fill={[Color.Neutral, 700]}>
    Headline
  </Text>
)

const BUTTONTOP = () => <InputButtonIconTertiary size="large" iconName="close" />

const TEXT = () => (
  <>
    <Text small fill={[Color.Neutral, 700]} wrap>
      In life there will be road blocks but we will over come it. You see the hedges, how I got it shaped up? It’s
      important to shape up your hedges, it’s like getting a haircut, stay fresh. The key to success is to keep your
      head above the water, never give up. It’s important to use cocoa butter. It’s the key to more success, why not
      live smooth? Why live rough? They key is to have every key, the key to open every door. You see the hedges, how I
      got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh.
    </Text>

    <Spacer small />

    <Text small fill={[Color.Neutral, 700]} wrap>
      Congratulations, you played yourself. Celebrate success right, the only way, apple. To succeed you must believe.
      When you believe, you will succeed. Surround yourself with angels. They don’t want us to eat. They key is to have
      every key, the key to open every door. You smart, you loyal, you a genius. We don’t see them, we will never see
      them. You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Watch your
      back, but more importantly when you get out the shower, dry your back, it’s a cold world out there.
    </Text>

    <Spacer small />

    <Text small fill={[Color.Neutral, 700]} wrap>
      Life is what you make it, so let’s make it. The key to more success is to have a lot of pillows. Wraith talk. It’s
      on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Another one. The
      other day the grass was brown, now it’s green because I ain’t give up. Never surrender. A major key, never panic.
      Don’t panic, when it gets crazy and rough, don’t panic, stay calm. Always remember in the jungle there’s a lot of
      they in there, after you overcome they, you will make it to paradise.
    </Text>

    <Spacer small />

    <Text small fill={[Color.Neutral, 700]} wrap>
      Learning is cool, but knowing is better, and I know the key to success. Always remember in the jungle there’s a
      lot of they in there, after you overcome they, you will make it to paradise. Always remember in the jungle there’s
      a lot of they in there, after you overcome they, you will make it to paradise. Let me be clear, you have to make
      it through the jungle to make it to paradise, that’s the key, Lion!
    </Text>

    <Spacer small />

    <Text small fill={[Color.Primary, 700]}>
      <a href="http://khaledipsum.com/">Provided by Khaled Ipsum</a>
    </Text>
  </>
)

const CARDS = () => {
  const cards = [
    {
      icon: "unpaved_road",
      header: "On road blocks",
      body: "In life there will be road blocks but we will over come it.",
    },

    {
      icon: "ar_stickers",
      header: "On playing yourself",
      body: "Congratulations, you played yourself.",
    },

    {
      icon: "nightlife",
      header: "On life",
      body: "Life is what you make it, so let’s make it.",
    },

    {
      icon: "lock_open",
      header: "On the key to success",
      body: "Learning is cool, but knowing is better, and I know the key to success.",
    },
  ]

  return (
    <Grid columns="three">
      {cards.map((card, index) => (
        <Stack key={index} vertical fill={[Color.Tertiary, 700]} cornerRadius="large">
          <Align horizontal left>
            <Icon medium name={card.icon} fill={[Color.Tertiary, 50]} />

            <Spacer xsmall />

            <Text small fill={[Color.Tertiary, 50]} wrap>
              <b>{card.header}</b>
            </Text>
          </Align>

          <Spacer xsmall />

          <Align horizontal left>
            <Text small fill={[Color.Tertiary, 50]} wrap>
              &ldquo;{card.body}&rdquo;
            </Text>
          </Align>
        </Stack>
      ))}
    </Grid>
  )
}

const BUTTONSBOTTOM = () => (
  <>
    <InputButtonTertiary size="large" width="auto" label="Cancel" />

    <Spacer small />

    <InputButtonPrimary size="large" width="auto" label="Save" />
  </>
)

const FILTER = ({
  items,
  valueText,
  setValueText,
  valueSingle,
  setValueSingle,
  checked,
  setChecked,
  valueMultiple,
  setValueMultiple,
  disabled,
}: any) => (
  <Stack horizontal hug>
    <Align horizontal left>
      <InputTextSingle
        label={["inside", "Filter"]}
        placeholder="Type to filter..."
        size="large"
        width="fixed"
        value={valueText}
        color={Color.Neutral}
        onChange={v => setValueText(v)}
      />

      <Spacer medium />

      <InputCheckbox size="large" color={Color.Primary} label="Enable" value={checked} onChange={v => setChecked(v)} />
    </Align>

    <Spacer medium />

    <Align horizontal right>
      <InputCombobox
        size="large"
        width="auto"
        label={["inside", "Number"]}
        color={Color.Neutral}
        textNoSelection=""
        filterOptions={{
          textFilterNoResults: "No results",
          textFilterPlaceholder: "Filter...",
        }}
        value={valueSingle}
        onChange={v => setValueSingle(v as string)}
      >
        {items.map((item, index) => (
          <InputComboboxItem key={index} label={item.label} value={item.value} />
        ))}
      </InputCombobox>

      <Spacer medium />

      <InputCombobox
        size="large"
        width="fixed"
        label={["inside", "Number"]}
        color={Color.Neutral}
        textNoSelection=""
        filterOptions={{
          textFilterNoResults: "No results",
          textFilterPlaceholder: "Filter...",
        }}
        value={valueMultiple}
        onChange={v => setValueMultiple(v as string[])}
        disabled={disabled}
        multiple
        resettable
        clearable
      >
        {items.map((item, index) => (
          <InputComboboxItem key={index} label={item.label} value={item.value} />
        ))}
      </InputCombobox>
    </Align>
  </Stack>
)

export default () => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [valueMultiple, setValueMultiple] = useState(["1", "2"])
  const [valueSingle, setValueSingle] = useState("2")
  const [valueText, setValueText] = useState("")
  const [checked, setChecked] = useState(false)

  const [items] = useState([
    { value: "1", label: "One asdkjhasdkhjaskdjhas d" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
    { value: "4", label: "Four" },
    { value: "5", label: "Five" },
    { value: "6", label: "Six" },
    { value: "7", label: "Seven" },
    { value: "8", label: "Eight" },
    { value: "9", label: "Nine" },
    { value: "10", label: "Ten" },
  ])

  return (
    <>
      <PageBounds>
        <LoadingDisabled
          loading={loading}
          disabled={disabled}
          onLoadingChange={setLoading}
          onDisabledChange={setDisabled}
        />

        <Spacer large />

        <Stack
          vertical
          loading={loading}
          disabled={disabled}
          stroke={[Color.Neutral, 100]}
          fillLoading={[Color.Neutral, 700]}
          cornerRadius="large"
          hug
        >
          <Align vertical topLeft>
            <Stack horizontal>
              <Align horizontal left>
                <TEXTHEADING />
              </Align>

              <Align vertical right>
                <BUTTONTOP />
              </Align>
            </Stack>

            <Stack horizontal>
              <Align horizontal left>
                <FILTER
                  items={items}
                  valueText={valueText}
                  setValueText={setValueText}
                  valueSingle={valueSingle}
                  setValueSingle={setValueSingle}
                  checked={checked}
                  setChecked={setChecked}
                  valueMultiple={valueMultiple}
                  setValueMultiple={setValueMultiple}
                />
              </Align>
            </Stack>

            <Stack vertical>
              <Align vertical left>
                <OverflowContainer
                  axes="vertical"
                  colorBackground={[Color.White]}
                  colorForeground={Color.Primary}
                  maxHeight="300px"
                  hug
                >
                  <TEXT />

                  <Spacer large />

                  <CARDS />
                </OverflowContainer>
              </Align>
            </Stack>

            <Divider horizontal fill={[Color.Neutral, 100]} />

            <Stack horizontal>
              <Align horizontal right>
                <BUTTONSBOTTOM />
              </Align>
            </Stack>
          </Align>
        </Stack>
      </PageBounds>

      <ResetStyles />
    </>
  )
}
