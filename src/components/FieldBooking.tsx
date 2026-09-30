import { useState } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface DaySchedule {
  date: string;
  dayName: string;
  slots: TimeSlot[];
}

const generateWeekSchedule = (): DaySchedule[] => {
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const times = ['4:00 م', '5:00 م', '6:00 م', '7:00 م', '8:00 م', '9:00 م'];
  
  return Array.from({ length: 7 }).map((_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('ar-EG'),
    dayName: days[i],
    slots: times.map(time => ({
      time,
      available: Math.random() > 0.3,
      bookedBy: Math.random() > 0.7 ? 'ناشئين U10' : undefined
    }))
  }));
};

export default function FieldBooking() {
  const [schedule] = useState<DaySchedule[]>(generateWeekSchedule());
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; slot: number } | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSlotClick = (dayIndex: number, slotIndex: number) => {
    const slot = schedule[dayIndex].slots[slotIndex];
    if (slot.available) {
      setSelectedSlot({ day: dayIndex, slot: slotIndex });
      setShowBookingForm(true);
    }
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setShowBookingForm(false);
      setSelectedSlot(null);
    }, 3000);
  };

  return (
    <section id="field-booking" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">حجز الملاعب</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏟️ حجز <span className="gradient-text-blue">الملاعب</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            احجز الملعب المناسب في الوقت المناسب
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="glass-card p-6 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="text-gray-400 text-sm font-semibold">الوقت</div>
              {schedule.map((day, i) => (
                <div key={i} className="text-center">
                  <div className="text-white font-bold text-sm">{day.dayName}</div>
                  <div className="text-gray-400 text-xs">{day.date}</div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              {schedule[0].slots.map((_, slotIndex) => (
                <div key={slotIndex} className="grid grid-cols-8 gap-2">
                  <div className="text-gray-400 text-sm flex items-center">
                    {schedule[0].slots[slotIndex].time}
                  </div>
                  {schedule.map((day, dayIndex) => {
                    const slot = day.slots[slotIndex];
                    return (
                      <button
                        key={dayIndex}
                        onClick={() => handleSlotClick(dayIndex, slotIndex)}
                        disabled={!slot.available}
                        className={`p-3 rounded-lg text-xs font-semibold transition-all ${
                          slot.available
                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 cursor-pointer'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.available ? '✓ متاح' : `✗ ${slot.bookedBy}`}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/30" />
            <span className="text-gray-400 text-sm">متاح للحجز</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/10 border border-red-500/20" />
            <span className="text-gray-400 text-sm">محجوز</span>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingForm && selectedSlot && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card p-8 max-w-md w-full">
              {bookingConfirmed ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-white font-bold text-xl mb-2">تم الحجز بنجاح!</h3>
                  <p className="text-gray-400 text-sm">
                    {schedule[selectedSlot.day].dayName} - {schedule[selectedSlot.day].slots[selectedSlot.slot].time}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl mb-4">تأكيد الحجز</h3>
                  <div className="glass-card-light p-4 mb-4">
                    <div className="text-gray-400 text-xs mb-1">الملعب</div>
                    <div className="text-white font-semibold">الملعب الرئيسي</div>
                  </div>
                  <div className="glass-card-light p-4 mb-4">
                    <div className="text-gray-400 text-xs mb-1">التاريخ</div>
                    <div className="text-white font-semibold">
                      {schedule[selectedSlot.day].dayName} - {schedule[selectedSlot.day].date}
                    </div>
                  </div>
                  <div className="glass-card-light p-4 mb-6">
                    <div className="text-gray-400 text-xs mb-1">الوقت</div>
                    <div className="text-white font-semibold">
                      {schedule[selectedSlot.day].slots[selectedSlot.slot].time}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={confirmBooking}
                      className="flex-1 py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg shadow-lg"
                    >
                      تأكيد الحجز
                    </button>
                    <button
                      onClick={() => {
                        setShowBookingForm(false);
                        setSelectedSlot(null);
                      }}
                      className="px-6 py-3 glass-card text-white rounded-lg"
                    >
                      إلغاء
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
