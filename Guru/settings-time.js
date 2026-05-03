const { malvin } = require("../GuruTech/malvin");

// Major time zones with representative countries
const timeZones = [
    // GMT -12 to -1
    { region: "GMT-12:00", countries: ["Baker Island", "Howland Island"], offset: -12, flag: "🌴" },
    { region: "GMT-11:00", countries: ["American Samoa", "Niue"], offset: -11, flag: "🏝️" },
    { region: "GMT-10:00", countries: ["Hawaii", "Tahiti"], offset: -10, flag: "🌺" },
    { region: "GMT-9:00", countries: ["Alaska", "Gambier Islands"], offset: -9, flag: "🏔️" },
    { region: "GMT-8:00", countries: ["Los Angeles", "Vancouver"], offset: -8, flag: "🌉" },
    { region: "GMT-7:00", countries: ["Denver", "Phoenix"], offset: -7, flag: "⛰️" },
    { region: "GMT-6:00", countries: ["Chicago", "Mexico City"], offset: -6, flag: "🌆" },
    { region: "GMT-5:00", countries: ["New York", "Toronto"], offset: -5, flag: "🗽" },
    { region: "GMT-4:00", countries: ["Caracas", "Santiago"], offset: -4, flag: "🌅" },
    { region: "GMT-3:00", countries: ["Buenos Aires", "São Paulo"], offset: -3, flag: "💃" },
    
    // GMT +0 to +14
    { region: "GMT+0:00", countries: ["London", "Dublin", "Lisbon"], offset: 0, flag: "🇬🇧" },
    { region: "GMT+1:00", countries: ["Paris", "Berlin", "Rome"], offset: 1, flag: "🇪🇺" },
    { region: "GMT+2:00", countries: ["Cairo", "Johannesburg", "Athens"], offset: 2, flag: "🌍" },
    { region: "GMT+3:00", countries: ["Moscow", "Nairobi", "Riyadh"], offset: 3, flag: "🇷🇺" },
    { region: "GMT+4:00", countries: ["Dubai", "Baku", "Mauritius"], offset: 4, flag: "🇦🇪" },
    { region: "GMT+5:00", countries: ["Islamabad", "Tashkent", "Maldives"], offset: 5, flag: "🇵🇰" },
    { region: "GMT+5:30", countries: ["Mumbai", "Delhi", "Colombo"], offset: 5.5, flag: "🇮🇳" },
    { region: "GMT+6:00", countries: ["Dhaka", "Almaty", "Bishkek"], offset: 6, flag: "🇧🇩" },
    { region: "GMT+7:00", countries: ["Bangkok", "Jakarta", "Hanoi"], offset: 7, flag: "🇹🇭" },
    { region: "GMT+8:00", countries: ["Beijing", "Singapore", "Perth"], offset: 8, flag: "🇨🇳" },
    { region: "GMT+9:00", countries: ["Tokyo", "Seoul", "Pyongyang"], offset: 9, flag: "🇯🇵" },
    { region: "GMT+10:00", countries: ["Sydney", "Guam", "Port Moresby"], offset: 10, flag: "🇦🇺" },
    { region: "GMT+11:00", countries: ["Nouméa", "Honiara", "Magadan"], offset: 11, flag: "🏖️" },
    { region: "GMT+12:00", countries: ["Auckland", "Fiji", "Petropavlovsk"], offset: 12, flag: "🇳🇿" },
    { region: "GMT+13:00", countries: ["Apia", "Nuku'alofa", "Tokelau"], offset: 13, flag: "🌺" },
    { region: "GMT+14:00", countries: ["Kiritimati", "Line Islands"], offset: 14, flag: "🏝️" }
];

// Function to get time for a specific offset
function getTimeForOffset(offset) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (3600000 * offset));
    
    return targetTime.toLocaleString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Function to search for countries or cities
function searchTimeZones(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    timeZones.forEach(zone => {
        // Check region
        if (zone.region.toLowerCase().includes(lowerQuery)) {
            results.push({...zone, matchType: "region"});
        }
        
        // Check countries
        zone.countries.forEach(country => {
            if (country.toLowerCase().includes(lowerQuery)) {
                results.push({...zone, matchCountry: country, matchType: "country"});
            }
        });
    });
    
    return results;
}

malvin({
    pattern: 'time',
    alias: ['worldtime', 'timezone', 'clock'],
    desc: 'Show current times around the world by region or search specific locations',
    category: 'utility',
    filename: __filename,
    usage: '.time [region/country] or .time list'
}, async (malvin, mek, m, { args, reply }) => {
    try {
        const query = args.join(' ').toLowerCase();
        
        if (query === 'list') {
            // Show all time zones in a compact format
            let message = "🕒 *World Time Zones*\n\n";
            
            timeZones.forEach(zone => {
                const time = getTimeForOffset(zone.offset);
                message += `${zone.flag} *${zone.region}*\n` +
                          `📍 ${zone.countries.slice(0, 2).join(", ")}${zone.countries.length > 2 ? "..." : ""}\n` +
                          `⏰ ${time}\n\n`;
            });
            
            message += "💡 Use *.time [region/country]* to search for specific time zones";
            return reply(message);
        }
        
        if (query) {
            // Search for specific region or country
            const results = searchTimeZones(query);
            
            if (results.length === 0) {
                return reply(
                    `❌ No time zone found for "${query}"\n\n` +
                    `💡 Try searching for:\n` +
                    `• Regions: *.time GMT+5*\n` +
                    `• Countries: *.time japan*\n` +
                    `• Cities: *.time london*\n` +
                    `• Use *.time list* to see all available time zones`
                );
            }
            
            let message = `🔍 *Time Results for "${query}"*\n\n`;
            
            results.slice(0, 5).forEach(result => {
                const time = getTimeForOffset(result.offset);
                const displayName = result.matchType === "country" ? result.matchCountry : result.region;
                
                message += `${result.flag} *${displayName}* (${result.region})\n` +
                          `📍 ${result.countries.join(", ")}\n` +
                          `⏰ ${time}\n\n`;
            });
            
            if (results.length > 5) {
                message += `📋 ...and ${results.length - 5} more results. Refine your search.`;
            }
            
            return reply(message);
        }
        
        // Default: show current time in major cities
        const majorCities = [
            { name: "New York", offset: -5, flag: "🇺🇸" },
            { name: "London", offset: 0, flag: "🇬🇧" },
            { name: "Paris", offset: 1, flag: "🇫🇷" },
            { name: "Dubai", offset: 4, flag: "🇦🇪" },
            { name: "Mumbai", offset: 5.5, flag: "🇮🇳" },
            { name: "Singapore", offset: 8, flag: "🇸🇬" },
            { name: "Tokyo", offset: 9, flag: "🇯🇵" },
            { name: "Sydney", offset: 10, flag: "🇦🇺" }
        ];
        
        let message = "🕒 *Current World Times*\n\n";
        
        majorCities.forEach(city => {
            const time = getTimeForOffset(city.offset);
            message += `${city.flag} *${city.name}:* ${time}\n`;
        });
        
        message += "\n💡 Use *.time [region/country]* to search or *.time list* for all time zones";
        
        return reply(message);
        
    } catch (error) {
        console.error('❌ Time command error:', error.message);
        return reply("❌ Failed to fetch time information. Please try again.");
    }
});

malvin({
    pattern: 'mytime',
    alias: ['localtime', 'now'],
    desc: 'Show your local time based on your phone settings',
    category: 'utility',
    filename: __filename,
    usage: '.mytime'
}, async (malvin, mek, m, { reply }) => {
    try {
        const now = new Date();
        const time = now.toLocaleString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZoneName: 'short'
        });
        
        return reply(`📱 *Your Local Time*\n\n⏰ ${time}`);
        
    } catch (error) {
        console.error('❌ Mytime command error:', error.message);
        return reply("❌ Failed to get your local time. Please try again.");
    }
});

malvin({
    pattern: 'gmt',
    alias: ['utc', 'zulu'],
    desc: 'Show current GMT/UTC time with offset calculator',
    category: 'utility',
    filename: __filename,
    usage: '.gmt [±hours]'
}, async (malvin, mek, m, { args, reply }) => {
    try {
        const now = new Date();
        const gmtTime = now.toUTCString().replace("GMT", "UTC");
        const offset = parseInt(args[0]) || 0;
        
        let message = `🌐 *GMT/UTC Time*\n\n⏰ ${gmtTime}\n`;
        
        if (offset !== 0) {
            const targetTime = new Date(now.getTime() + (offset * 3600000));
            const formattedTime = targetTime.toUTCString().replace("GMT", "UTC");
            message += `\n⏰ GMT${offset >= 0 ? '+' : ''}${offset}: ${formattedTime}`;
        }
        
        message += "\n\n*Common GMT Offsets:*\n";
        message += "• GMT-8: Los Angeles\n";
        message += "• GMT-5: New York\n";
        message += "• GMT+0: London\n";
        message += "• GMT+3: Moscow\n";
        message += "• GMT+5:30: India\n";
        message += "• GMT+8: Beijing\n";
        message += "• GMT+9: Tokyo\n";
        
        message += "\n💡 Use *.gmt +3* or *.gmt -5* to calculate specific offsets";
        
        return reply(message);
        
    } catch (error) {
        console.error('❌ GMT command error:', error.message);
        return reply("❌ Failed to get GMT time. Please try again.");
    }
});
