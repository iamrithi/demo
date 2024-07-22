/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DInYpftRD8u
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { userRoleStore } from "@/state/state";
import { MountainIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaMountain } from "react-icons/fa";

export default function Component() {
  return (
    <div className="flex flex-col h-[100vh] overflow-y-auto ">
      <header className="bg-black/30 backdrop-blur-[100px] w-full text-primary-foreground px-4 lg:px-6 h-14  p-3 flex justify-between items-center fixed">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="text-white">VOrA</span>
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Button variant={"outline"} className="text-theme">
            Login In <FaArrowRight className="ml-2 text-theme" />
          </Button>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full h-[100vh] py-12 md:py-24 lg:py-32 bg-[url('/img2.png')] bg-cover text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Veteran Affairs in one place
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Our comprehensive platform helps veterans and their families
                    access essential resources, file grievances, and stay
                    up-to-date with the latest policies and documents.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="">
                {/* <AspectRatio ratio={16 / 16}>
                  <Image
                    src={"/img2.png"}
                    alt="Image"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Veteran Affairs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a comprehensive suite of tools to help
                  veterans and their families manage their affairs efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">FAQs</h3>
                <p className="text-sm text-muted-foreground">
                  Access frequently asked questions to provide quick and
                  accurate responses.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Grievance</h3>
                <p className="text-sm text-muted-foreground">
                  Review and address grievances promptly to ensure veteran
                  satisfaction.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Keep up to date with the latest policy changes and documents.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">CSD</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and track stock levels for critical supplies and
                  services for veterans.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Veterans Outreach
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Veterans Outreach is a comprehensive platform designed to
                streamline the management of veteran affairs. Our mission is to
                provide veterans and their families with the resources, support,
                and information they need to navigate the complex landscape of
                veteran services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Contact Us
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <p>
              K&K Sub Area HQ (Army)
              <br />
              4/2, Cubbon Rd, Tasker Town,
              <br />
              Sampangi Rama Nagar,
              <br />
              Bengaluru, Karnataka 560001,
              <br />
              India
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Quick Links</h3>
            <Link href="#" prefetch={false}>
              FAQs
            </Link>
            <Link href="#" prefetch={false}>
              Grievance
            </Link>
            <Link href="#" prefetch={false}>
              Documents
            </Link>
            <Link href="#" prefetch={false}>
              About
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Community
            </Link>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Help Center
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Social</h3>
            <Link href="#" prefetch={false}>
              Facebook
            </Link>
            <Link href="#" prefetch={false}>
              Twitter
            </Link>
            <Link href="#" prefetch={false}>
              LinkedIn
            </Link>
            <Link href="#" prefetch={false}>
              Instagram
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
