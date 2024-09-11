"use client"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    LabelList,
    Line,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    Rectangle,
    ReferenceLine,
    XAxis,
    YAxis,
} from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import '../App.css'
import { Link } from "react-router-dom"
import {
    ChevronLeft,
    Home,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
    User,
    Users,
    Users2,
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
import FadeIn from "@/components/FadeIn"
import Sidebar from "@/components/Sidebar"
import UserProfileIcon from "@/components/ui/UserProfileIcon"

export function Dashboard() {


    return (
        <div className="flex min-h-screen w-full flex-col bg-[#05140D]">


            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden scrollbar-hidden">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-gray-700 bg-[#05140D] px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
                    <Sidebar />

                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h3 className="md:text-4xl text-2xl font-semibold text-left text-white w-full py-3 md:px-3 z-[5]">
                            Dashboard
                        </h3>
                    </FadeIn>

                    <FadeIn direction="down" delay={0.2}>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-300" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-[#05140D] text-white placeholder-gray-300 pl-8 md:w-[200px] lg:w-[336px] border border-gray-600"
                            />
                        </div>
                    </FadeIn>

                    <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon className="text-white" />
                    </FadeIn>
                </header>

                <FadeIn direction="up" delay={0.2} fullWidth>
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

                        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                            <Card x-chunk="dashboard-01-chunk-0" className="bg-[#1A3A2C] text-white border-none shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">
                                        Total Revenue
                                    </CardTitle>
                                    <DollarSign className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$45,231.89</div>
                                    <p className="text-xs text-gray-400">
                                        +20.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-01-chunk-1" className="bg-[#1A3A2C] text-white border-none shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">
                                        Subscriptions
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+2350</div>
                                    <p className="text-xs text-gray-400">
                                        +180.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-01-chunk-2" className="bg-[#1A3A2C] text-white border-none shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">Sales</CardTitle>
                                    <CreditCard className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12,234</div>
                                    <p className="text-xs text-gray-400">
                                        +19% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-01-chunk-3" className="bg-[#1A3A2C] text-white border-none shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-300">Active Now</CardTitle>
                                    <Activity className="h-4 w-4 text-[#2FB574]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+573</div>
                                    <p className="text-xs text-gray-400">
                                        +201 since last hour
                                    </p>
                                </CardContent>
                            </Card>
                        </div>


                        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            <Card
                                className="xl:col-span-2 bg-[#1A3A2C] border-none shadow-none"
                                x-chunk="dashboard-01-chunk-4"
                            >
                                <CardHeader className="flex flex-row items-center">
                                    <div className="grid gap-2">
                                        <CardTitle className="text-gray-300">Transactions</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Recent transactions from your store.
                                        </CardDescription>
                                    </div>
                                    <Button asChild size="sm" className="ml-auto gap-1 text-[#2FB574]">
                                        <Link href="#">
                                            View All
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <Table className="bg-[#1A3A2C] text-white">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-gray-400">Customer</TableHead>
                                                <TableHead className="hidden xl:table-column text-gray-400">Type</TableHead>
                                                <TableHead className="hidden xl:table-column text-gray-400">Status</TableHead>
                                                <TableHead className="hidden xl:table-column text-gray-400">Date</TableHead>
                                                <TableHead className="text-right text-gray-400">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium text-white">Liam Johnson</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">liam@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden xl:table-column text-white">Sale</TableCell>
                                                <TableCell className="hidden xl:table-column">
                                                    <Badge className="text-xs text-white" variant="outline">Approved</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-white">2023-06-23</TableCell>
                                                <TableCell className="text-right text-white">$250.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium text-white">Olivia Smith</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">olivia@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden xl:table-column text-white">Refund</TableCell>
                                                <TableCell className="hidden xl:table-column">
                                                    <Badge className="text-xs text-white" variant="outline">Declined</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-white">2023-06-24</TableCell>
                                                <TableCell className="text-right text-white">$150.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium text-white">Noah Williams</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">noah@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden xl:table-column text-white">Subscription</TableCell>
                                                <TableCell className="hidden xl:table-column">
                                                    <Badge className="text-xs text-white" variant="outline">Approved</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-white">2023-06-25</TableCell>
                                                <TableCell className="text-right text-white">$350.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium text-white">Emma Brown</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">emma@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden xl:table-column text-white">Sale</TableCell>
                                                <TableCell className="hidden xl:table-column">
                                                    <Badge className="text-xs text-white" variant="outline">Approved</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-white">2023-06-26</TableCell>
                                                <TableCell className="text-right text-white">$450.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="font-medium text-white">Liam Johnson</div>
                                                    <div className="hidden text-sm text-gray-500 md:inline">liam@example.com</div>
                                                </TableCell>
                                                <TableCell className="hidden xl:table-column text-white">Sale</TableCell>
                                                <TableCell className="hidden xl:table-column">
                                                    <Badge className="text-xs text-white" variant="outline">Approved</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column text-white">2023-06-27</TableCell>
                                                <TableCell className="text-right text-white">$550.00</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#1A3A2C] border-none shadow-none" x-chunk="dashboard-01-chunk-5">
                                <CardHeader>
                                    <CardTitle className="text-gray-300">Recent Sales</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-8">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                            <AvatarFallback>OM</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Olivia Martin</p>
                                            <p className="text-sm text-muted-foreground text-white">olivia.martin@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$1,999.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                            <AvatarFallback>JL</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Jackson Lee</p>
                                            <p className="text-sm text-muted-foreground text-white">jackson.lee@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$39.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                            <AvatarFallback>IN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Isabella Nguyen</p>
                                            <p className="text-sm text-muted-foreground text-white">isabella.nguyen@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$299.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                            <AvatarFallback>WK</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">William Kim</p>
                                            <p className="text-sm text-muted-foreground text-white">will@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$99.00</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                            <AvatarFallback>SD</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none text-white">Sofia Davis</p>
                                            <p className="text-sm text-muted-foreground text-white">sofia.davis@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+$39.00</div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                        {/* <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
                            <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                                <Card
                                    className="lg:max-w-md" x-chunk="charts-01-chunk-0"
                                >
                                    <CardHeader className="space-y-0 pb-2">
                                        <CardDescription>Today</CardDescription>
                                        <CardTitle className="text-4xl tabular-nums">
                                            12,584{" "}
                                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                                steps
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer
                                            config={{
                                                steps: {
                                                    label: "Steps",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                            }}
                                        >
                                            <BarChart
                                                accessibilityLayer
                                                margin={{
                                                    left: -4,
                                                    right: -4,
                                                }}
                                                data={[
                                                    {
                                                        date: "2024-01-01",
                                                        steps: 2000,
                                                    },
                                                    {
                                                        date: "2024-01-02",
                                                        steps: 2100,
                                                    },
                                                    {
                                                        date: "2024-01-03",
                                                        steps: 2200,
                                                    },
                                                    {
                                                        date: "2024-01-04",
                                                        steps: 1300,
                                                    },
                                                    {
                                                        date: "2024-01-05",
                                                        steps: 1400,
                                                    },
                                                    {
                                                        date: "2024-01-06",
                                                        steps: 2500,
                                                    },
                                                    {
                                                        date: "2024-01-07",
                                                        steps: 1600,
                                                    },
                                                ]}
                                            >
                                                <Bar
                                                    dataKey="steps"
                                                    fill="var(--color-steps)"
                                                    radius={5}
                                                    fillOpacity={0.6}
                                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={4}
                                                    tickFormatter={(value) => {
                                                        return new Date(value).toLocaleDateString("en-US", {
                                                            weekday: "short",
                                                        })
                                                    }}
                                                />
                                                <ChartTooltip
                                                    defaultIndex={2}
                                                    content={
                                                        <ChartTooltipContent
                                                            hideIndicator
                                                            labelFormatter={(value) => {
                                                                return new Date(value).toLocaleDateString("en-US", {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                })
                                                            }}
                                                        />
                                                    }
                                                    cursor={false}
                                                />
                                                <ReferenceLine
                                                    y={1200}
                                                    stroke="hsl(var(--muted-foreground))"
                                                    strokeDasharray="3 3"
                                                    strokeWidth={1}
                                                >
                                                    <Label
                                                        position="insideBottomLeft"
                                                        value="Average Steps"
                                                        offset={10}
                                                        fill="hsl(var(--foreground))"
                                                    />
                                                    <Label
                                                        position="insideTopLeft"
                                                        value="12,343"
                                                        className="text-lg"
                                                        fill="hsl(var(--foreground))"
                                                        offset={10}
                                                        startOffset={100}
                                                    />
                                                </ReferenceLine>
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                    <CardFooter className="flex-col items-start gap-1">
                                        <CardDescription>
                                            Over the past 7 days, you have walked{" "}
                                            <span className="font-medium text-foreground">53,305</span> steps.
                                        </CardDescription>
                                        <CardDescription>
                                            You need{" "}
                                            <span className="font-medium text-foreground">12,584</span> more
                                            steps to reach your goal.
                                        </CardDescription>
                                    </CardFooter>
                                </Card>
                                <Card
                                    className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1"
                                >
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                                        <div>
                                            <CardDescription>Resting HR</CardDescription>
                                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                                62
                                                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                                                    bpm
                                                </span>
                                            </CardTitle>
                                        </div>
                                        <div>
                                            <CardDescription>Variability</CardDescription>
                                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                                35
                                                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                                                    ms
                                                </span>
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-1 items-center">
                                        <ChartContainer
                                            config={{
                                                resting: {
                                                    label: "Resting",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                            }}
                                            className="w-full"
                                        >
                                            <LineChart
                                                accessibilityLayer
                                                margin={{
                                                    left: 14,
                                                    right: 14,
                                                    top: 10,
                                                }}
                                                data={[
                                                    {
                                                        date: "2024-01-01",
                                                        resting: 62,
                                                    },
                                                    {
                                                        date: "2024-01-02",
                                                        resting: 72,
                                                    },
                                                    {
                                                        date: "2024-01-03",
                                                        resting: 35,
                                                    },
                                                    {
                                                        date: "2024-01-04",
                                                        resting: 62,
                                                    },
                                                    {
                                                        date: "2024-01-05",
                                                        resting: 52,
                                                    },
                                                    {
                                                        date: "2024-01-06",
                                                        resting: 62,
                                                    },
                                                    {
                                                        date: "2024-01-07",
                                                        resting: 70,
                                                    },
                                                ]}
                                            >
                                                <CartesianGrid
                                                    strokeDasharray="4 4"
                                                    vertical={false}
                                                    stroke="hsl(var(--muted-foreground))"
                                                    strokeOpacity={0.5}
                                                />
                                                <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                                                <XAxis
                                                    dataKey="date"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={8}
                                                    tickFormatter={(value) => {
                                                        return new Date(value).toLocaleDateString("en-US", {
                                                            weekday: "short",
                                                        })
                                                    }}
                                                />
                                                <Line
                                                    dataKey="resting"
                                                    type="natural"
                                                    fill="var(--color-resting)"
                                                    stroke="var(--color-resting)"
                                                    strokeWidth={2}
                                                    dot={false}
                                                    activeDot={{
                                                        fill: "var(--color-resting)",
                                                        stroke: "var(--color-resting)",
                                                        r: 4,
                                                    }}
                                                />
                                                <ChartTooltip
                                                    content={
                                                        <ChartTooltipContent
                                                            indicator="line"
                                                            labelFormatter={(value) => {
                                                                return new Date(value).toLocaleDateString("en-US", {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                })
                                                            }}
                                                        />
                                                    }
                                                    cursor={false}
                                                />
                                            </LineChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                                <Card
                                    className="max-w-xs" x-chunk="charts-01-chunk-2"
                                >
                                    <CardHeader>
                                        <CardTitle>Progress</CardTitle>
                                        <CardDescription>
                                            You're average more steps a day this year than last year.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <div className="grid auto-rows-min gap-2">
                                            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                12,453
                                                <span className="text-sm font-normal text-muted-foreground">
                                                    steps/day
                                                </span>
                                            </div>
                                            <ChartContainer
                                                config={{
                                                    steps: {
                                                        label: "Steps",
                                                        color: "hsl(var(--chart-1))",
                                                    },
                                                }}
                                                className="aspect-auto h-[32px] w-full"
                                            >
                                                <BarChart
                                                    accessibilityLayer
                                                    layout="vertical"
                                                    margin={{
                                                        left: 0,
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                    }}
                                                    data={[
                                                        {
                                                            date: "2024",
                                                            steps: 12435,
                                                        },
                                                    ]}
                                                >
                                                    <Bar
                                                        dataKey="steps"
                                                        fill="var(--color-steps)"
                                                        radius={4}
                                                        barSize={32}
                                                    >
                                                        <LabelList
                                                            position="insideLeft"
                                                            dataKey="date"
                                                            offset={8}
                                                            fontSize={12}
                                                            fill="white"
                                                        />
                                                    </Bar>
                                                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                                                    <XAxis dataKey="steps" type="number" hide />
                                                </BarChart>
                                            </ChartContainer>
                                        </div>
                                        <div className="grid auto-rows-min gap-2">
                                            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                10,103
                                                <span className="text-sm font-normal text-muted-foreground">
                                                    steps/day
                                                </span>
                                            </div>
                                            <ChartContainer
                                                config={{
                                                    steps: {
                                                        label: "Steps",
                                                        color: "hsl(var(--muted))",
                                                    },
                                                }}
                                                className="aspect-auto h-[32px] w-full"
                                            >
                                                <BarChart
                                                    accessibilityLayer
                                                    layout="vertical"
                                                    margin={{
                                                        left: 0,
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                    }}
                                                    data={[
                                                        {
                                                            date: "2023",
                                                            steps: 10103,
                                                        },
                                                    ]}
                                                >
                                                    <Bar
                                                        dataKey="steps"
                                                        fill="var(--color-steps)"
                                                        radius={4}
                                                        barSize={32}
                                                    >
                                                        <LabelList
                                                            position="insideLeft"
                                                            dataKey="date"
                                                            offset={8}
                                                            fontSize={12}
                                                            fill="hsl(var(--muted-foreground))"
                                                        />
                                                    </Bar>
                                                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                                                    <XAxis dataKey="steps" type="number" hide />
                                                </BarChart>
                                            </ChartContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="max-w-xs" x-chunk="charts-01-chunk-3"
                                >
                                    <CardHeader className="p-4 pb-0">
                                        <CardTitle>Walking Distance</CardTitle>
                                        <CardDescription>
                                            Over the last 7 days, your distance walked and run was 12.5 miles
                                            per day.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                                        <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                                            12.5
                                            <span className="text-sm font-normal text-muted-foreground">
                                                miles/day
                                            </span>
                                        </div>
                                        <ChartContainer
                                            config={{
                                                steps: {
                                                    label: "Steps",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                            }}
                                            className="ml-auto w-[72px]"
                                        >
                                            <BarChart
                                                accessibilityLayer
                                                margin={{
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 0,
                                                }}
                                                data={[
                                                    {
                                                        date: "2024-01-01",
                                                        steps: 2000,
                                                    },
                                                    {
                                                        date: "2024-01-02",
                                                        steps: 2100,
                                                    },
                                                    {
                                                        date: "2024-01-03",
                                                        steps: 2200,
                                                    },
                                                    {
                                                        date: "2024-01-04",
                                                        steps: 1300,
                                                    },
                                                    {
                                                        date: "2024-01-05",
                                                        steps: 1400,
                                                    },
                                                    {
                                                        date: "2024-01-06",
                                                        steps: 2500,
                                                    },
                                                    {
                                                        date: "2024-01-07",
                                                        steps: 1600,
                                                    },
                                                ]}
                                            >
                                                <Bar
                                                    dataKey="steps"
                                                    fill="var(--color-steps)"
                                                    radius={2}
                                                    fillOpacity={0.2}
                                                    activeIndex={6}
                                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={4}
                                                    hide
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="max-w-xs" x-chunk="charts-01-chunk-4"
                                >
                                    <CardContent className="flex gap-4 p-4 pb-2">
                                        <ChartContainer
                                            config={{
                                                move: {
                                                    label: "Move",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                                stand: {
                                                    label: "Stand",
                                                    color: "hsl(var(--chart-2))",
                                                },
                                                exercise: {
                                                    label: "Exercise",
                                                    color: "hsl(var(--chart-3))",
                                                },
                                            }}
                                            className="h-[140px] w-full"
                                        >
                                            <BarChart
                                                margin={{
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 10,
                                                }}
                                                data={[
                                                    {
                                                        activity: "stand",
                                                        value: (8 / 12) * 100,
                                                        label: "8/12 hr",
                                                        fill: "var(--color-stand)",
                                                    },
                                                    {
                                                        activity: "exercise",
                                                        value: (46 / 60) * 100,
                                                        label: "46/60 min",
                                                        fill: "var(--color-exercise)",
                                                    },
                                                    {
                                                        activity: "move",
                                                        value: (245 / 360) * 100,
                                                        label: "245/360 kcal",
                                                        fill: "var(--color-move)",
                                                    },
                                                ]}
                                                layout="vertical"
                                                barSize={32}
                                                barGap={2}
                                            >
                                                <XAxis type="number" dataKey="value" hide />
                                                <YAxis
                                                    dataKey="activity"
                                                    type="category"
                                                    tickLine={false}
                                                    tickMargin={4}
                                                    axisLine={false}
                                                    className="capitalize"
                                                />
                                                <Bar dataKey="value" radius={5}>
                                                    <LabelList
                                                        position="insideLeft"
                                                        dataKey="label"
                                                        fill="white"
                                                        offset={8}
                                                        fontSize={12}
                                                    />
                                                </Bar>
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                    <CardFooter className="flex flex-row border-t p-4">
                                        <div className="flex w-full items-center gap-2">
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-xs text-muted-foreground">Move</div>
                                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                    562
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        kcal
                                                    </span>
                                                </div>
                                            </div>
                                            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-xs text-muted-foreground">Exercise</div>
                                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                    73
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        min
                                                    </span>
                                                </div>
                                            </div>
                                            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-xs text-muted-foreground">Stand</div>
                                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                    14
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        hr
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                            <div className="grid w-full flex-1 gap-6">
                                <Card
                                    className="max-w-xs" x-chunk="charts-01-chunk-5"
                                >
                                    <CardContent className="flex gap-4 p-4">
                                        <div className="grid items-center gap-2">
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-sm text-muted-foreground">Move</div>
                                                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                                    562/600
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        kcal
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-sm text-muted-foreground">Exercise</div>
                                                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                                    73/120
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        min
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-sm text-muted-foreground">Stand</div>
                                                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                                    8/12
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        hr
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChartContainer
                                            config={{
                                                move: {
                                                    label: "Move",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                                exercise: {
                                                    label: "Exercise",
                                                    color: "hsl(var(--chart-2))",
                                                },
                                                stand: {
                                                    label: "Stand",
                                                    color: "hsl(var(--chart-3))",
                                                },
                                            }}
                                            className="mx-auto aspect-square w-full max-w-[80%]"
                                        >
                                            <RadialBarChart
                                                margin={{
                                                    left: -10,
                                                    right: -10,
                                                    top: -10,
                                                    bottom: -10,
                                                }}
                                                data={[
                                                    {
                                                        activity: "stand",
                                                        value: (8 / 12) * 100,
                                                        fill: "var(--color-stand)",
                                                    },
                                                    {
                                                        activity: "exercise",
                                                        value: (46 / 60) * 100,
                                                        fill: "var(--color-exercise)",
                                                    },
                                                    {
                                                        activity: "move",
                                                        value: (245 / 360) * 100,
                                                        fill: "var(--color-move)",
                                                    },
                                                ]}
                                                innerRadius="20%"
                                                barSize={24}
                                                startAngle={90}
                                                endAngle={450}
                                            >
                                                <PolarAngleAxis
                                                    type="number"
                                                    domain={[0, 100]}
                                                    dataKey="value"
                                                    tick={false}
                                                />
                                                <RadialBar dataKey="value" background cornerRadius={5} />
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="max-w-xs" x-chunk="charts-01-chunk-6"
                                >
                                    <CardHeader className="p-4 pb-0">
                                        <CardTitle>Active Energy</CardTitle>
                                        <CardDescription>
                                            You're burning an average of 754 calories per day. Good job!
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                                        <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                                            1,254
                                            <span className="text-sm font-normal text-muted-foreground">
                                                kcal/day
                                            </span>
                                        </div>
                                        <ChartContainer
                                            config={{
                                                calories: {
                                                    label: "Calories",
                                                    color: "hsl(var(--chart-1))",
                                                },
                                            }}
                                            className="ml-auto w-[64px]"
                                        >
                                            <BarChart
                                                accessibilityLayer
                                                margin={{
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 0,
                                                }}
                                                data={[
                                                    {
                                                        date: "2024-01-01",
                                                        calories: 354,
                                                    },
                                                    {
                                                        date: "2024-01-02",
                                                        calories: 514,
                                                    },
                                                    {
                                                        date: "2024-01-03",
                                                        calories: 345,
                                                    },
                                                    {
                                                        date: "2024-01-04",
                                                        calories: 734,
                                                    },
                                                    {
                                                        date: "2024-01-05",
                                                        calories: 645,
                                                    },
                                                    {
                                                        date: "2024-01-06",
                                                        calories: 456,
                                                    },
                                                    {
                                                        date: "2024-01-07",
                                                        calories: 345,
                                                    },
                                                ]}
                                            >
                                                <Bar
                                                    dataKey="calories"
                                                    fill="var(--color-calories)"
                                                    radius={2}
                                                    fillOpacity={0.2}
                                                    activeIndex={6}
                                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={4}
                                                    hide
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="max-w-xs" x-chunk="charts-01-chunk-7"
                                >
                                    <CardHeader className="space-y-0 pb-0">
                                        <CardDescription>Time in Bed</CardDescription>
                                        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                            8
                                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                                hr
                                            </span>
                                            35
                                            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                                min
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <ChartContainer
                                            config={{
                                                time: {
                                                    label: "Time",
                                                    color: "hsl(var(--chart-2))",
                                                },
                                            }}
                                        >
                                            <AreaChart
                                                accessibilityLayer
                                                data={[
                                                    {
                                                        date: "2024-01-01",
                                                        time: 8.5,
                                                    },
                                                    {
                                                        date: "2024-01-02",
                                                        time: 7.2,
                                                    },
                                                    {
                                                        date: "2024-01-03",
                                                        time: 8.1,
                                                    },
                                                    {
                                                        date: "2024-01-04",
                                                        time: 6.2,
                                                    },
                                                    {
                                                        date: "2024-01-05",
                                                        time: 5.2,
                                                    },
                                                    {
                                                        date: "2024-01-06",
                                                        time: 8.1,
                                                    },
                                                    {
                                                        date: "2024-01-07",
                                                        time: 7.0,
                                                    },
                                                ]}
                                                margin={{
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <XAxis dataKey="date" hide />
                                                <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                                                <defs>
                                                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                                                        <stop
                                                            offset="5%"
                                                            stopColor="var(--color-time)"
                                                            stopOpacity={0.8}
                                                        />
                                                        <stop
                                                            offset="95%"
                                                            stopColor="var(--color-time)"
                                                            stopOpacity={0.1}
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    dataKey="time"
                                                    type="natural"
                                                    fill="url(#fillTime)"
                                                    fillOpacity={0.4}
                                                    stroke="var(--color-time)"
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel />}
                                                    formatter={(value) => (
                                                        <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                                            Time in bed
                                                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                                {value}
                                                                <span className="font-normal text-muted-foreground">
                                                                    hr
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            </AreaChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </div> */}
                    </main>
                </FadeIn>
            </div>
        </div>
    )
}
