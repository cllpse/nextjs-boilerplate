import { Stack } from "@new/Stack/Stack"
import { Align } from "@new/Stack/Align"
import { Color } from "@new/Color"
import { Grid } from "@new/Grid/Grid"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@new/Chart/Chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts"
import { computeColor } from "@new/Color"
import { PageBounds } from "@new/Composition/PageBounds"
import ResetStyles from "../internal/ResetStyles"
import { Spacer } from "@new/Stack/Spacer"
import { Text } from "@new/Text/Text"

export default () => {
  const pieData = [
    { browser: "chrome", visitors: 275, fill: computeColor([Color.Primary, 700]) },
    { browser: "safari", visitors: 200, fill: computeColor([Color.Quarternary, 700]) },
    { browser: "firefox", visitors: 287, fill: computeColor([Color.Secondary, 700]) },
    { browser: "edge", visitors: 173, fill: computeColor([Color.Quinary, 700]) },
    { browser: "other", visitors: 190, fill: computeColor([Color.Warning, 700]) },
  ]

  const pieConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
    },
    safari: {
      label: "Safari",
    },
    firefox: {
      label: "Firefox",
    },
    edge: {
      label: "Edge",
    },
    other: {
      label: "Other",
    },
  } satisfies ChartConfig

  const barData = [
    { browser: "chrome", visitors: 275, fill: computeColor([Color.Primary, 700]) },
    { browser: "safari", visitors: 200, fill: computeColor([Color.Quarternary, 700]) },
    { browser: "firefox", visitors: 187, fill: computeColor([Color.Secondary, 700]) },
    { browser: "edge", visitors: 173, fill: computeColor([Color.Quinary, 700]) },
    { browser: "other", visitors: 90, fill: computeColor([Color.Warning, 700]) },
  ]

  const barConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
    },
    safari: {
      label: "Safari",
    },
    firefox: {
      label: "Firefox",
    },
    edge: {
      label: "Edge",
    },
    other: {
      label: "Other",
    },
  } satisfies ChartConfig

  const radarData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const radarConfig = {
    desktop: {
      label: "Desktop",
      color: computeColor([Color.Primary, 700]),
    },
    mobile: {
      label: "Mobile",
      color: computeColor([Color.Quarternary, 700]),
    },
  } satisfies ChartConfig

  const lineData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
    { date: "2024-05-01", desktop: 165, mobile: 220 },
    { date: "2024-05-02", desktop: 293, mobile: 310 },
    { date: "2024-05-03", desktop: 247, mobile: 190 },
    { date: "2024-05-04", desktop: 385, mobile: 420 },
    { date: "2024-05-05", desktop: 481, mobile: 390 },
    { date: "2024-05-06", desktop: 498, mobile: 520 },
    { date: "2024-05-07", desktop: 388, mobile: 300 },
    { date: "2024-05-08", desktop: 149, mobile: 210 },
    { date: "2024-05-09", desktop: 227, mobile: 180 },
    { date: "2024-05-10", desktop: 293, mobile: 330 },
    { date: "2024-05-11", desktop: 335, mobile: 270 },
    { date: "2024-05-12", desktop: 197, mobile: 240 },
    { date: "2024-05-13", desktop: 197, mobile: 160 },
    { date: "2024-05-14", desktop: 448, mobile: 490 },
    { date: "2024-05-15", desktop: 473, mobile: 380 },
    { date: "2024-05-16", desktop: 338, mobile: 400 },
    { date: "2024-05-17", desktop: 499, mobile: 420 },
    { date: "2024-05-18", desktop: 315, mobile: 350 },
    { date: "2024-05-19", desktop: 235, mobile: 180 },
    { date: "2024-05-20", desktop: 177, mobile: 230 },
    { date: "2024-05-21", desktop: 82, mobile: 140 },
    { date: "2024-05-22", desktop: 81, mobile: 120 },
    { date: "2024-05-23", desktop: 252, mobile: 290 },
    { date: "2024-05-24", desktop: 294, mobile: 220 },
    { date: "2024-05-25", desktop: 201, mobile: 250 },
    { date: "2024-05-26", desktop: 213, mobile: 170 },
    { date: "2024-05-27", desktop: 420, mobile: 460 },
    { date: "2024-05-28", desktop: 233, mobile: 190 },
    { date: "2024-05-29", desktop: 78, mobile: 130 },
    { date: "2024-05-30", desktop: 340, mobile: 280 },
    { date: "2024-05-31", desktop: 178, mobile: 230 },
    { date: "2024-06-01", desktop: 178, mobile: 200 },
    { date: "2024-06-02", desktop: 470, mobile: 410 },
    { date: "2024-06-03", desktop: 103, mobile: 160 },
    { date: "2024-06-04", desktop: 439, mobile: 380 },
    { date: "2024-06-05", desktop: 88, mobile: 140 },
    { date: "2024-06-06", desktop: 294, mobile: 250 },
    { date: "2024-06-07", desktop: 323, mobile: 370 },
    { date: "2024-06-08", desktop: 385, mobile: 320 },
    { date: "2024-06-09", desktop: 438, mobile: 480 },
    { date: "2024-06-10", desktop: 155, mobile: 200 },
    { date: "2024-06-11", desktop: 92, mobile: 150 },
    { date: "2024-06-12", desktop: 492, mobile: 420 },
    { date: "2024-06-13", desktop: 81, mobile: 130 },
    { date: "2024-06-14", desktop: 426, mobile: 380 },
    { date: "2024-06-15", desktop: 307, mobile: 350 },
    { date: "2024-06-16", desktop: 371, mobile: 310 },
    { date: "2024-06-17", desktop: 475, mobile: 520 },
    { date: "2024-06-18", desktop: 107, mobile: 170 },
    { date: "2024-06-19", desktop: 341, mobile: 290 },
    { date: "2024-06-20", desktop: 408, mobile: 450 },
    { date: "2024-06-21", desktop: 169, mobile: 210 },
    { date: "2024-06-22", desktop: 317, mobile: 270 },
    { date: "2024-06-23", desktop: 480, mobile: 530 },
    { date: "2024-06-24", desktop: 132, mobile: 180 },
    { date: "2024-06-25", desktop: 141, mobile: 190 },
    { date: "2024-06-26", desktop: 434, mobile: 380 },
    { date: "2024-06-27", desktop: 448, mobile: 490 },
    { date: "2024-06-28", desktop: 149, mobile: 200 },
    { date: "2024-06-29", desktop: 103, mobile: 160 },
    { date: "2024-06-30", desktop: 446, mobile: 400 },
  ]

  const lineConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop",
    },
    mobile: {
      label: "Mobile",
    },
  } satisfies ChartConfig

  const radialData = [
    { browser: "chrome", visitors: 275, fill: computeColor([Color.Primary, 700]) },
    { browser: "safari", visitors: 200, fill: computeColor([Color.Quarternary, 700]) },
    { browser: "firefox", visitors: 187, fill: computeColor([Color.Secondary, 700]) },
    { browser: "edge", visitors: 173, fill: computeColor([Color.Quinary, 700]) },
    { browser: "other", visitors: 90, fill: computeColor([Color.Warning, 700]) },
  ]

  const radialConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
    },
    safari: {
      label: "Safari",
    },
    firefox: {
      label: "Firefox",
    },
    edge: {
      label: "Edge",
    },
    other: {
      label: "Other",
    },
  } satisfies ChartConfig

  return (
    <>
      <PageBounds>
        <>
          <Grid columns="three">
            <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
              <Align vertical left>
                <Text small fill={[Color.Neutral, 700]}>
                  <b>Header</b>
                </Text>

                <Spacer xsmall />

                <Text xsmall fill={[Color.Neutral, 700]}>
                  Description
                </Text>

                <Spacer large />

                <ChartContainer config={pieConfig}>
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

                    <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                  1000
                                </tspan>

                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                  Visitors
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </Align>
            </Stack>

            <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
              <Align vertical left>
                <Text small fill={[Color.Neutral, 700]}>
                  <b>Header</b>
                </Text>

                <Spacer xsmall />

                <Text xsmall fill={[Color.Neutral, 700]}>
                  Description
                </Text>

                <Spacer large />

                <ChartContainer config={barConfig}>
                  <BarChart
                    accessibilityLayer
                    data={barData}
                    layout="vertical"
                    margin={{
                      left: 8,
                    }}
                  >
                    <YAxis
                      dataKey="browser"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={value => barConfig[value as keyof typeof barConfig]?.label}
                    />

                    <XAxis dataKey="visitors" type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="visitors" layout="vertical" radius={5} />
                  </BarChart>
                </ChartContainer>
              </Align>
            </Stack>

            <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
              <Align vertical left>
                <Text small fill={[Color.Neutral, 700]}>
                  <b>Header</b>
                </Text>

                <Spacer xsmall />

                <Text xsmall fill={[Color.Neutral, 700]}>
                  Description
                </Text>

                <Spacer large />

                <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-[250px]">
                  <RadarChart data={radarData}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid />
                    <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
                    <Radar dataKey="mobile" fill="var(--color-mobile)" />
                    <ChartLegend className="mt-8" content={<ChartLegendContent />} />
                  </RadarChart>
                </ChartContainer>
              </Align>
            </Stack>
          </Grid>

          <Spacer tiny />

          <Spacer small />

          <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
            <Align vertical left>
              <Text small fill={[Color.Neutral, 700]}>
                <b>Header</b>
              </Text>

              <Spacer xsmall />

              <Text xsmall fill={[Color.Neutral, 700]}>
                Description
              </Text>

              <Spacer large />

              <div style={{ display: "flex", width: "100%", height: "100%", maxHeight: "calc(var(--BU) * 60)" }}>
                <ChartContainer config={lineConfig} className="aspect-auto h-[250px] w-full">
                  <LineChart accessibilityLayer data={lineData}>
                    <CartesianGrid vertical={false} />

                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={value => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                    />

                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          nameKey="views"
                          labelFormatter={value => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          }}
                        />
                      }
                    />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke={computeColor([Color.Neutral, 700])}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </Align>
          </Stack>

          <Spacer tiny />

          <Spacer small />

          <Grid columns="three">
            <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
              <Align vertical left>
                <Text small fill={[Color.Neutral, 700]}>
                  <b>Header</b>
                </Text>

                <Spacer xsmall />

                <Text xsmall fill={[Color.Neutral, 700]}>
                  Description
                </Text>

                <Spacer large />

                <ChartContainer config={radialConfig} className="mx-auto aspect-square max-h-[250px]">
                  <RadialBarChart data={radialData} innerRadius="25%" outerRadius="100%">
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
                    <RadialBar dataKey="visitors" background />
                  </RadialBarChart>
                </ChartContainer>
              </Align>
            </Stack>

            <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
              <Align vertical center></Align>
            </Stack>

            <Stack vertical stroke={[Color.Neutral, 100]} cornerRadius="large">
              <Align vertical center></Align>
            </Stack>
          </Grid>
        </>
      </PageBounds>

      <ResetStyles />
    </>
  )
}
