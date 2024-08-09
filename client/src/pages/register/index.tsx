import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const index = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="luna@mail.com"
              className="mt-1"
              aria-label="Email Address"
            />
          </div>
          <div>
            <Label htmlFor="tel">Phone</Label>
            <Input
              type="tel"
              id="tel"
              placeholder="+254712345678"
              className="mt-1"
              aria-label="Phone"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1"
              aria-label="Password"
            />
          </div>
          <Button className="w-full text-white py-2 rounded-md transition duration-300">
            Register
          </Button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-gray-500 uppercase">
            or sign up with
          </span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>
        <div className="flex justify-evenly mt-6">
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 border border-gray-300 shadow-sm rounded-full"
            aria-label="Sign up with Facebook"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <title>Facebook</title>
              <path
                d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
                fill="#1877F2"
              />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 border border-gray-300 shadow-sm rounded-full"
            aria-label="Sign up with Apple"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <title>Apple</title>
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="#000000"
              />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 border border-gray-300 shadow-sm rounded-full"
            aria-label="Sign up with Google"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <title>Google</title>
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="#FF7143"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
};

export default index;
