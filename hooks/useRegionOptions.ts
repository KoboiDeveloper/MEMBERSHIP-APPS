import { useEffect, useState } from "react";
import axios from "axios";

export type RegionOption = { id: string | number; label: string };

// Opsi dropdown provinsi, dan kota yang mengikuti provinsi terpilih
export default function useRegionOptions(provinceId: string) {
  const [optionsProv, setOptionsProv] = useState<RegionOption[]>([]);
  const [optionsCity, setOptionsCity] = useState<RegionOption[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}provinces`,
        );
        setOptionsProv(
          response.data.provincesData.map(
            (item: { prov_id: number | string; prov_name: string }) => ({
              id: item.prov_id,
              label: item.prov_name,
            }),
          ),
        );
      } catch (error) {
        console.log("Error fetching province data:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!provinceId) {
      setOptionsCity([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}cities?provID=${provinceId}`,
        );
        setOptionsCity(
          response.data.citiesData.map(
            (item: { city_id: number | string; city_name: string }) => ({
              id: item.city_id,
              label: item.city_name,
            }),
          ),
        );
      } catch (error) {
        console.log("Error fetching city data:", error);
      }
    };
    fetchCities();
  }, [provinceId]);

  return { optionsProv, optionsCity };
}
