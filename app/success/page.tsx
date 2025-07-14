import { Suspense } from "react";
import Success from "@/components/Success/Success";

export default function Page() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Success />
      </Suspense>
    </main>
  );
}
