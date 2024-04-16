"use client"
import React, { useEffect, useState } from 'react'
import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { MainNav } from "./components/main-nav"
import { Overview } from "./components/overview"

import { UserNav } from "./components/user-nav"
import { Book, BusFront, BusIcon, GraduationCap, LucideBike, NotebookText, NotepadTextDashed, Sheet } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SkeletonCard } from '@/components/skeleton-card'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/components/columns'
import { ModeToggle } from '@/components/ui/theme-toggle'
import { Input } from '@/components/ui/input'

interface DashboardPageProps {
  params: { userId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
  const [isMounted, setIsmounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    setIsmounted(true)
    // console.log("hello")
  }, []);

  const getUserDetails = async () => {
    try {
      console.log(params.userId)
      const { data } = await axios.get(`/api/user/${params.userId}`)
      if (data) {
        console.log(data)
        setUser(data)
      }
      else {
        toast.error("Re-Authenticate Yourself!")
        router.push("/");
      }
    } catch (error) {
      // toast.error("Something went wrong!")
      toast.error("Re-Authenticate Yourself!")
      console.log(error);
      router.push("/");
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [params.userId])

  const getToatalMarks = (result: any) => {
    let totalMarks = 0;
    totalMarks += Number(result.physicsMarks) + Number(result.mathsMarks) + Number(result.chemistryMarks) + Number(result.csmarks) + Number(result.englishMarks)
    return totalMarks;
  }

  if (!isMounted) return null;
  if (loading) return <div className='w-screen h-screen items-center flex justify-center'><SkeletonCard /></div>


  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">

            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="exams" >
                Exams
              </TabsTrigger>
              <TabsTrigger value="profile" >
                Profile
              </TabsTrigger>

            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Attendence
                    </CardTitle>
                    {/* <Sheet/> */}
                    <NotepadTextDashed size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.attendance} %</div>
                    <p className="text-xs text-muted-foreground">
                      +10% from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subjects
                    </CardTitle>
                    <Book size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card className=' '>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transport Mode</CardTitle>
                    {/* <BusIcon/> */}
                  </CardHeader>
                  <CardContent className='flex flex-col gap-1'>
                    <div className="text-2xl font-bold">{user.transportManagement == "bus" ? <BusFront /> : <LucideBike />}</div>
                    <p className="text-xs text-muted-foreground">
                      Selected by you
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Branch
                    </CardTitle>
                    <GraduationCap size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.stream}</div>
                    <p className="text-xs text-muted-foreground">
                      Computer Science and Engineering
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Exams
                    </CardTitle>
                    {/* <GraduationCap size={20} /> */}
                    <NotebookText size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.results.length}</div>
                    <p className="text-xs text-muted-foreground">
                      past exams
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview results={user.results} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>All Exams</CardTitle>
                    <CardDescription>
                      You have attempted {user.results.length} exams
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.results.map((result: any) => (
                      <div key={result.id} className='flex flex-col gap-1 m-2 mx-4'>
                        <p className='grid grid-cols-3 justify-between mx-5   font-medium'>{result.examName} <span>{getToatalMarks(result)}</span>  {result.overall === "PASS" ? <Badge className='items-center justify-center flex' variant="default">Pass</Badge> : <Badge variant="destructive">fail</Badge>} </p>
                        <Separator />
                      </div>))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="exams" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className=" font-medium">
                    All Exams
                  </CardTitle>
                  {/* <Book size={18} /> */}
                </CardHeader>
                <CardContent>
                  <DataTable searchKey="examName" columns={columns} data={user.results} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="profile" className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle className=" gap-1 flex-col flex font-medium">
                    Personal Details
                    <Separator/>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row gap-10 m-2 flex-wrap'>
                    <div className='flex items-center gap-2 '>
                      <label htmlFor="firstname">First Name</label>
                      <Input value={user.firstName} className='w-fit' id="firstname" />
                    </div>
                    <div className='flex items-center gap-2'>
                      <label htmlFor="lastname">Last Name</label>
                      <Input className='w-fit' value={user.lastName} id="firstname" />
                    </div>
                    <div className='flex items-center gap-2 '>
                      <label htmlFor="rollno">Registeration No.</label>
                      <Input className='w-fit' value={user.rollno} id="rollno" />
                    </div>
                    <div className='flex items-center gap-2 '>
                      <label htmlFor="bgroup">Blood grp.</label>
                      <Input className='w-fit' value={user.bgroup} id="bgroup" />
                    </div>
                    <div className='flex items-center gap-2 '>
                      <label htmlFor="mobileNo">Mobile No</label>
                      <Input className='w-fit' value={user.mobileNo} id="mobileNo" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
