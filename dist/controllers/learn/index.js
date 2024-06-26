import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });
export const getAllCourses = async (req, res, next) => {
    try {
        res.status(200).json([
            {
                "id": "abc123",
                "creatorId": {
                    "name": "Creator1",
                    "image": "creator1.jpg"
                },
                "mediumLanguage": "english",
                "learningLanguage": "spanish",
                "title": "Spanish for Beginners",
                "subheading": "Learn the basics of the Spanish language",
                "introductionMD": "This course is designed for absolute beginners who want to learn Spanish from scratch.",
                "goalsMD": "By the end of this course, you will be able to introduce yourself, hold basic conversations, and understand simple texts in Spanish.",
                "requirementsMD": "No prior knowledge of Spanish is required.",
                "videoUrl": "https://www.example.com/spanish-beginners-intro",
                "imageUrl": "https://www.example.com/spanish-beginners-image.jpg",
                "level": 1,
                "created_at": "2024-05-08T10:00:00Z",
                "units": [
                    {
                        "id": "Spanishunit1",
                        "courseId": "abc123",
                        "title": "Unit 1",
                        "type": "learn",
                        "lessons": [
                            {
                                "id": "Spanishlesson1",
                                "courseId": "abc123",
                                "unitId": "unit1",
                                "title": "SpanishFirst Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson1-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson1",
                                        "bodyMD": "This is the content of section 1",
                                        "imageUrl": "https://www.example.com/section1-image.jpg",
                                        "noteMD": "Note for section 1"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson1",
                                        "word": "Hola",
                                        "translation": "Hello",
                                        "audioUrl": "https://www.example.com/hola-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson2",
                                "courseId": "abc123",
                                "unitId": "unit1",
                                "title": "SpanishSecond Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson2-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson2",
                                        "bodyMD": "This is the content of section 1 for lesson 2",
                                        "imageUrl": "https://www.example.com/section1-image2.jpg",
                                        "noteMD": "Note for section 1 of lesson 2"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson2",
                                        "word": "Adiós",
                                        "translation": "Goodbye",
                                        "audioUrl": "https://www.example.com/adios-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson3",
                                "courseId": "abc123",
                                "unitId": "unit1",
                                "title": "SpanishThird Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson3-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson3",
                                        "bodyMD": "This is the content of section 1 for lesson 3",
                                        "imageUrl": "https://www.example.com/section1-image3.jpg",
                                        "noteMD": "Note for section 1 of lesson 3"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson3",
                                        "word": "Por favor",
                                        "translation": "Please",
                                        "audioUrl": "https://www.example.com/por-favor-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson4",
                                "courseId": "abc123",
                                "unitId": "unit1",
                                "title": "SpanishFourth Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson4-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson4",
                                        "bodyMD": "This is the content of section 1 for lesson 4",
                                        "imageUrl": "https://www.example.com/section1-image4.jpg",
                                        "noteMD": "Note for section 1 of lesson 4"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson4",
                                        "word": "Gracias",
                                        "translation": "Thank you",
                                        "audioUrl": "https://www.example.com/gracias-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson5",
                                "courseId": "abc123",
                                "unitId": "unit1",
                                "title": "SpanishFifth Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson5-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson5",
                                        "bodyMD": "This is the content of section 1 for lesson 5",
                                        "imageUrl": "https://www.example.com/section1-image5.jpg",
                                        "noteMD": "Note for section 1 of lesson 5"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson5",
                                        "word": "Sí",
                                        "translation": "Yes",
                                        "audioUrl": "https://www.example.com/si-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson6",
                                "courseId": "abc123",
                                "unitId": "unit1",
                                "title": "SpanishSixth Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson6-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson6",
                                        "bodyMD": "This is the content of section 1 for lesson 6",
                                        "imageUrl": "https://www.example.com/section1-image6.jpg",
                                        "noteMD": "Note for section 1 of lesson 6"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson6",
                                        "word": "No",
                                        "translation": "No",
                                        "audioUrl": "https://www.example.com/no-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            }
                        ]
                    },
                    {
                        "id": "Spanishunit2",
                        "courseId": "abc123",
                        "title": "Unit 2",
                        "type": "learn",
                        "lessons": [
                            {
                                "id": "Spanishlesson1",
                                "courseId": "abc123",
                                "unitId": "unit2",
                                "title": "SpanishFirst Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson1-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson1",
                                        "bodyMD": "This is the content of section 1",
                                        "imageUrl": "https://www.example.com/section1-image.jpg",
                                        "noteMD": "Note for section 1"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson1",
                                        "word": "Hola",
                                        "translation": "Hello",
                                        "audioUrl": "https://www.example.com/hola-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson2",
                                "courseId": "abc123",
                                "unitId": "unit2",
                                "title": "SpanishSecond Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson2-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson2",
                                        "bodyMD": "This is the content of section 1 for lesson 2",
                                        "imageUrl": "https://www.example.com/section1-image2.jpg",
                                        "noteMD": "Note for section 1 of lesson 2"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson2",
                                        "word": "Adiós",
                                        "translation": "Goodbye",
                                        "audioUrl": "https://www.example.com/adios-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            },
                            {
                                "id": "Spanishlesson3",
                                "courseId": "abc123",
                                "unitId": "unit2",
                                "title": "SpanishThird Lesson",
                                "videoUrl": "https://www.example.com/spanish-lesson3-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson3",
                                        "bodyMD": "This is the content of section 1 for lesson 3",
                                        "imageUrl": "https://www.example.com/section1-image3.jpg",
                                        "noteMD": "Note for section 1 of lesson 3"
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [
                                    {
                                        "id": "vocab1",
                                        "lessonId": "lesson3",
                                        "word": "Por favor",
                                        "translation": "Please",
                                        "audioUrl": "https://www.example.com/por-favor-audio.mp3",
                                        "imageUrl": ""
                                    }
                                ],
                                "exercises": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "def456",
                "creatorId": {
                    "name": "Creator2",
                    "image": "creator2.jpg"
                },
                "mediumLanguage": "english",
                "learningLanguage": "french",
                "title": "French Cuisine Essentials",
                "subheading": "Master the art of French cooking",
                "introductionMD": "In this course, you will learn the fundamental techniques and recipes of French cuisine.",
                "goalsMD": "By the end of this course, you will be able to prepare classic French dishes and understand the principles behind French cooking.",
                "requirementsMD": "Basic cooking skills are recommended.",
                "videoUrl": "https://www.example.com/french-cuisine-intro",
                "imageUrl": "https://www.example.com/french-cuisine-image.jpg",
                "level": 2,
                "created_at": "2024-05-10T09:30:00Z",
                "units": [
                    {
                        "id": "French-unit1",
                        "courseId": "def456",
                        "title": "Basic Techniques",
                        "type": "learn",
                        "lessons": [
                            {
                                "id": "French-lesson1",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Knife Skills",
                                "videoUrl": "https://www.example.com/french-cuisine-knife-skills-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson1",
                                        "bodyMD": "This lesson covers basic knife techniques such as chopping, dicing, and mincing.",
                                        "imageUrl": "https://www.example.com/knife-skills-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            },
                            {
                                "id": "French-lesson2",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Sauteing",
                                "videoUrl": "https://www.example.com/french-cuisine-sauteing-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson2",
                                        "bodyMD": "Learn the technique of sautéing vegetables and meats to enhance their flavor and texture.",
                                        "imageUrl": "https://www.example.com/sauteing-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            },
                            {
                                "id": "French-lesson3",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Braising",
                                "videoUrl": "https://www.example.com/french-cuisine-braising-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson3",
                                        "bodyMD": "Discover the slow-cooking method of braising to tenderize tough cuts of meat and infuse them with rich flavor.",
                                        "imageUrl": "https://www.example.com/braising-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            },
                            {
                                "id": "French-lesson4",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Roux",
                                "videoUrl": "https://www.example.com/french-cuisine-roux-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson4",
                                        "bodyMD": "Master the art of making roux, the thickening agent used in many French sauces and soups.",
                                        "imageUrl": "https://www.example.com/roux-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            },
                            {
                                "id": "French-lesson5",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Emulsions",
                                "videoUrl": "https://www.example.com/french-cuisine-emulsions-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson5",
                                        "bodyMD": "Explore the science of emulsions and learn how to create stable mixtures of oil and water in dressings and sauces.",
                                        "imageUrl": "https://www.example.com/emulsions-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            },
                            {
                                "id": "French-lesson6",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Deglazing",
                                "videoUrl": "https://www.example.com/french-cuisine-deglazing-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson6",
                                        "bodyMD": "Learn how to deglaze a pan to create flavorful sauces by loosening and dissolving browned bits of food.",
                                        "imageUrl": "https://www.example.com/deglazing-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            },
                            {
                                "id": "French-lesson7",
                                "courseId": "def456",
                                "unitId": "unit1",
                                "title": "Poaching",
                                "videoUrl": "https://www.example.com/french-cuisine-poaching-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson7",
                                        "bodyMD": "Discover the gentle cooking technique of poaching for delicate proteins such as fish and eggs.",
                                        "imageUrl": "https://www.example.com/poaching-image.jpg",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            }
                        ]
                    },
                    {
                        "id": "French-unit2",
                        "courseId": "def456",
                        "title": "Sauces and Stocks",
                        "type": "learn",
                        "lessons": []
                    },
                    {
                        "id": "French-unit3",
                        "courseId": "def456",
                        "title": "Baking Techniques",
                        "type": "learn",
                        "lessons": []
                    }
                ]
            },
            {
                "id": "ghi789",
                "creatorId": {
                    "name": "Creator3",
                    "image": "creator3.jpg"
                },
                "mediumLanguage": "english",
                "learningLanguage": "german",
                "title": "German Travel Phrases",
                "subheading": "Essential phrases for traveling in Germany",
                "introductionMD": "Planning a trip to Germany? This course will teach you common phrases and expressions to use while traveling.",
                "goalsMD": "By the end of this course, you will be able to greet people, ask for directions, order food, and handle basic travel situations in German.",
                "requirementsMD": "No prior knowledge of German is required.",
                "videoUrl": "https://www.example.com/german-travel-phrases-intro",
                "imageUrl": "https://www.example.com/german-travel-phrases-image.jpg",
                "level": 1,
                "created_at": "2024-05-12T11:00:00Z",
                "units": [
                    {
                        "id": "unit1",
                        "courseId": "ghi789",
                        "title": "Greetings and Basic Phrases",
                        "type": "learn",
                        "lessons": [
                            {
                                "id": "lesson1",
                                "courseId": "ghi789",
                                "unitId": "unit1",
                                "title": "Greetings",
                                "videoUrl": "https://www.example.com/german-greetings-video",
                                "sections": [
                                    {
                                        "id": "section1",
                                        "lessonId": "lesson1",
                                        "bodyMD": "Learn how to greet people in German and introduce yourself.",
                                        "imageUrl": "",
                                        "noteMD": ""
                                    }
                                ],
                                "summary": null,
                                "vocabulary": [],
                                "exercises": []
                            }
                        ]
                    }
                ]
            }
        ]);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
//# sourceMappingURL=index.js.map