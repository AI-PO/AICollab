export default function Step1Welcome() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F97316, #EAB308)', animation: 'pulse 2s infinite' }}
          >
            <svg width="32" height="32" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L14.196 5V11L9 14L3.804 11V5L9 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M9 5.5L12 7.25V10.75L9 12.5L6 10.75V7.25L9 5.5Z" fill="#F97316"/>
            </svg>
          </div>
          <div
            className="absolute inset-0 rounded-2xl opacity-40"
            style={{
              background: 'linear-gradient(135deg, #F97316, #EAB308)',
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
        </div>
      </div>
      <p className="text-text-secondary font-dm text-sm leading-relaxed text-center">
        The easiest way to swap Bitcoin-native assets. In the next 2 minutes we'll show you exactly how it works — no experience needed.
      </p>
    </div>
  );
}
