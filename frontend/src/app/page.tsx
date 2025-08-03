export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Charity Platform Starter</h1>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <section className="text-center">
          <h2 className="text-4xl font-extrabold mb-4">A Vision for Impact</h2>
          <p className="text-lg text-gray-600 mb-8">
            Empowering lives through technology and community.
          </p>
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
            Donate Now
          </button>
        </section>
      </main>
    </div>
  );
}
