export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
      <p className="mt-4">Something went wrong. Please try again or use a different payment method.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">Try Again</a>
    </div>
  );
}
