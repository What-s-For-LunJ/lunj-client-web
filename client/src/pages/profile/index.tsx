"use client";
import { Metadata } from "next";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardDetail,
  CardOffer,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { MainNav } from "@/components/ui/main-nav";
import { Overview } from "@/components/ui/overview";
import { RecentSales } from "@/components/ui/recent-sales";
import { Search } from "@/components/ui/search";
import TeamSwitcher from "@/components/ui/team-switcher";
import { UserNav } from "@/components/ui/user-nav";
import { CartNav } from "@/components/ui/cart";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
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
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <CartNav />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              What's For Lunj?
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="meals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="meals">Meals</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
              <TabsTrigger value="combos">Combos</TabsTrigger>
            </TabsList>
            <TabsContent value="meals" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/99/44/8e/kfc-faxafeni.jpg?w=800&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">KFC</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/30/f6/37/welcome-to-cj-s-a-fully.jpg?w=1100&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-25%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">CJ's</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://www.andy-cooks.com/cdn/shop/articles/20230826032636-andy-20cooks-20-20korean-20fried-20chicken.jpg?v=169308"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Smokeys</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://media-cdn.tripadvisor.com/media/photo-s/16/50/b2/32/big-knife-doner-shawarma.jpg"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Big Knife</p>
                    </CardDetail>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="restaurants" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/99/44/8e/kfc-faxafeni.jpg?w=800&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">KFC</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/30/f6/37/welcome-to-cj-s-a-fully.jpg?w=1100&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-25%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">CJ's</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://www.andy-cooks.com/cdn/shop/articles/20230826032636-andy-20cooks-20-20korean-20fried-20chicken.jpg?v=169308"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Smokeys</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://media-cdn.tripadvisor.com/media/photo-s/16/50/b2/32/big-knife-doner-shawarma.jpg"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Big Knife</p>
                    </CardDetail>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="offers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/99/44/8e/kfc-faxafeni.jpg?w=800&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">KFC</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/30/f6/37/welcome-to-cj-s-a-fully.jpg?w=1100&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-25%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">CJ's</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://www.andy-cooks.com/cdn/shop/articles/20230826032636-andy-20cooks-20-20korean-20fried-20chicken.jpg?v=169308"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Smokeys</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://media-cdn.tripadvisor.com/media/photo-s/16/50/b2/32/big-knife-doner-shawarma.jpg"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Big Knife</p>
                    </CardDetail>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="combos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/99/44/8e/kfc-faxafeni.jpg?w=800&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">KFC</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/30/f6/37/welcome-to-cj-s-a-fully.jpg?w=1100&h=-1&s=1"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-25%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">CJ's</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://www.andy-cooks.com/cdn/shop/articles/20230826032636-andy-20cooks-20-20korean-20fried-20chicken.jpg?v=169308"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Smokeys</p>
                    </CardDetail>
                  </CardContent>
                </Card>
                <Card
                  backgroundImage="https://media-cdn.tripadvisor.com/media/photo-s/16/50/b2/32/big-knife-doner-shawarma.jpg"
                  className="custom-class"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <CardOffer>
                      <p className="font-bold">-55%</p>
                    </CardOffer>
                  </CardHeader>
                  <CardContent className="p-2">
                    {" "}
                    {/* Adjusted padding */}
                    <CardDetail>
                      <p className="text-xs font-bold text-white">Big Knife</p>
                    </CardDetail>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
