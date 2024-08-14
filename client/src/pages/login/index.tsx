import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Index = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // POST request to the register API
        const response = await axios.post("http://localhost:8080/api/login", {
          email: values.email,
          password: values.password,
        });

        // Get the token from the response body
        const { token } = response.data;

        if (token) {
          // Store the token in local storage
          localStorage.setItem("token", token);

          // Redirect to home page after successful login
          router.push("/");
        } else {
          console.error("No token received.");
        }
      } catch (error) {
        // Check if error is an AxiosError
        if (axios.isAxiosError(error)) {
          // Handle login errors
          console.error("Login failed:", error.response?.data);
          alert("Login failed: " + error.response?.data);
        } else {
          console.error("An unexpected error occurred:", error);
          alert("An unexpected error occurred");
        }
      }
    },
  });

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12 lg:min-h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs font-bold mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="mt-1"
                  aria-label="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-xs font-bold mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <Image
          src="/assets/hii.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Index;
