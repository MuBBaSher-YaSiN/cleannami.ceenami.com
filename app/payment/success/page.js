export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-4">Thank you for your booking.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">Go Home</a>
    </div>
  );
}
