import Image from 'next/image';

export default function SizeGuidePage() {
  const measurements = [
    { size: 'XXS (XX-Small)', chest: '30-32"', waist: '24-26"', hips: '32-34"', neck: '13-13.5"' },
    { size: 'XS (X-Small)', chest: '34-36"', waist: '27-29"', hips: '35-37"', neck: '14-14.5"' },
    { size: 'S (Small)', chest: '38-40"', waist: '30-32"', hips: '38-40"', neck: '15-15.5"' },
    { size: 'M (Medium)', chest: '42-44"', waist: '33-35"', hips: '41-43"', neck: '16-16.5"' },
    { size: 'L (Large)', chest: '46-48"', waist: '36-38"', hips: '44-46"', neck: '17-17.5"' },
    { size: 'XL (X-Large)', chest: '50-52"', waist: '39-41"', hips: '47-49"', neck: '18-18.5"' },
    { size: 'XXL (XX-Large)', chest: '54-56"', waist: '42-44"', hips: '50-52"', neck: '19-19.5"' },
    { size: '3XL (3X-Large)', chest: '58-60"', waist: '45-47"', hips: '53-55"', neck: '20-20.5"' },
    { size: '4XL (4X-Large)', chest: '62-64"', waist: '48-50"', hips: '56-58"', neck: '21-21.5"' },
  ];

  const measurementInstructions = [
    {
      title: 'Chest',
      instruction: 'Measure around the fullest part of your chest, keeping the tape horizontal.',
    },
    {
      title: 'Waist',
      instruction: 'Measure around your natural waistline, keeping the tape comfortably loose.',
    },
    {
      title: 'Hips',
      instruction: 'Measure around the fullest part of your hips, keeping the tape horizontal.',
    },
    {
      title: 'Neck',
      instruction: 'Measure around the base of your neck, where a collar would sit.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Size Guide</h1>
        
        {/* How to Measure Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Measure</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {measurementInstructions.map((item) => (
              <div key={item.title} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.instruction}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Size Chart */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Size Chart</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chest
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waist
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hips
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Neck
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {measurements.map((measurement, idx) => (
                  <tr key={measurement.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {measurement.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.chest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.waist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.hips}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.neck}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Additional Information */}
        <section className="mt-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• All measurements are in inches</li>
              <li>• For the best fit, have someone else take your measurements</li>
              <li>• Keep the measuring tape snug but not tight</li>
              <li>• If you're between sizes, we recommend choosing the larger size</li>
              <li>• These measurements are a general guide. Fit may vary by style</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
