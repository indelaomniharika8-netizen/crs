
export function addRecentlyViewed(car) {
  const previous = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  const updated = [
    car,
    ...previous.filter((item) => item.id !== car.id)
  ].slice(0, 5);

  localStorage.setItem("recentlyViewed", JSON.stringify(updated));
}

export function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
}
