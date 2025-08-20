function parseIndoDate(dateStr: string) {
    const months: { [key: string]: number } = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    };

    const [day, monthName, year] = dateStr.split(" ");
    return new Date(
      parseInt(year),
      months[monthName as keyof typeof months],
      parseInt(day)
    );
  };

  function formatDate(date: string | Date): string {
    if (!date) return "-";

    const d = typeof date === "string" ? new Date(date) : date;

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  }

  export { parseIndoDate, formatDate };