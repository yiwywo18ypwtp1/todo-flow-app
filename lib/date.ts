export const formatDate = (iso: string) => {
    const date = new Date(iso);

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};