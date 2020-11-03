import { utilService } from '../services/util-service.js'


export const bookService = {
    getBooks,
    getById,
    addReview,
    saveBooksToStorage,
    getBooksFromGoogle,
    addBook,
    getNextAndPrevId
}

function saveBooksToStorage() {
    utilService.storeToStorage('books', books)
}

function getNextAndPrevId(bookId) {
    const bookIdx = books.findIndex(book => book.id === bookId);
    console.log('bookidx:', bookIdx);
    const nextBookId = (bookIdx < books.length - 1) ? books[bookIdx + 1].id : null;
    const prevBookId = (bookIdx > 0) ? books[bookIdx - 1].id : null;
    return { nextBookId, prevBookId }
}

function addReview(review, bookId) {
    return getById(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = [];
            book.reviews.push(review);
            console.log(book)
            saveBooksToStorage();
            return book;
        })

}

function addBook(book) {
    books.unshift(book);
    saveBooksToStorage();
}

function getBooks() {
    let booksFromStorage = utilService.loadFromStorage('books');
    console.log(booksFromStorage, 'in get books');
    if (!booksFromStorage || !booksFromStorage.length) {
        booksFromStorage = books;
        saveBooksToStorage();
    }
    books = booksFromStorage;
    return Promise.resolve(booksFromStorage);
}

function getById(id) {
    const book = books.find(currBook => currBook.id === id)
    return Promise.resolve(book)
}

function getBooksFromGoogle(searchTerm) {
    const defImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
        .then(books => {
            return books.data.items.map(book => {
                const vInfo = book.volumeInfo;
                const bookObject = {
                    id: book.id,
                    title: vInfo.title,
                    subtitle: vInfo.subtitle,
                    authors: vInfo.authors,
                    publishedDate: vInfo.publishedDate,
                    description: vInfo.description,
                    pageCount: vInfo.pageCount,
                    categories: vInfo.categories,
                    thumbnail: (vInfo.imageLinks) ? vInfo.imageLinks.thumbnail : defImg,
                    language: vInfo.language,
                    listPrice: {
                        amount: vInfo.pageCount,
                        currencyCode: "EUR",
                        isOnSale: false
                    }
                };
                return bookObject;
            })
        })
        // const books = googleBooks.items;
        // return Promise.resolve(books)
}

const googleBooks = {
    "kind": "books#volumes",
    "totalItems": 462,
    "items": [

        {
            "kind": "books#volume",
            "id": "wVDCjwEACAAJ",
            "etag": "fJeo67nKFEI",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/wVDCjwEACAAJ",
            "volumeInfo": {
                "title": "Effective Javascript",
                "subtitle": "68 Specific Ways to Harness the Power of Javascript",
                "authors": [
                    "David Herman"
                ],
                "publishedDate": "2016-03-08",
                "description": "\"It's uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You'll find when you finish the book that you've gained a strong and comprehensive sense of mastery.\"-Paul Irish, developer advocate, Google Chrome \"This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It's one of the few books on JS that I'll recommend without hesitation.\"-Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language's flexible, expressive features and how to avoid its pitfalls. No matter how long you've been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma's JavaScript standardization committee, illuminates the language's inner workings as never before-helping you take full advantage of JavaScript's expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you'll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You'll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript's functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript's unique \"run-to-completion\" approach to concurrency",
                "industryIdentifiers": [{
                        "type": "ISBN_10",
                        "identifier": "1530427223"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9781530427222"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 228,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_Javascript.html?hl=&id=wVDCjwEACAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=wVDCjwEACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "&quot;-Paul Irish, developer advocate, Google Chrome &quot;This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It&#39;s one of the few books on JS that I&#39;ll recommend without hesitation."
            }
        },
        {
            "kind": "books#volume",
            "id": "lT2g_y4VYx0C",
            "etag": "VamW5HmwS9w",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/lT2g_y4VYx0C",
            "volumeInfo": {
                "title": "Effective JavaScript",
                "authors": [
                    "Devid Herman"
                ],
                "publisher": "翔泳社",
                "publishedDate": "2013-04-13",
                "description": "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリーズに、満を持して登場!微妙な挙動に悩むプログラマや、よりシンプルで可読性に富んだコードを志向する開発者に、実践的で即効性のある処方を施してくれる1冊です。68の「なるほど!」は、伊達じゃない。 ※本電子書籍は同名出版物を底本とし作成しました。記載内容は印刷出版当時のものです。 ※印刷出版再現のため電子書籍としては不要な情報を含んでいる場合があります。 ※印刷出版とは異なる表記・表現の場合があります。予めご了承ください。 ※プレビューにてお手持ちの電子端末での表示状態をご確認の上、商品をお買い求めください。 (翔泳社)",
                "industryIdentifiers": [{
                        "type": "ISBN_13",
                        "identifier": "9784798131528"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4798131520"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 202,
                "printType": "BOOK",
                "categories": [
                    "Technology & Engineering"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "4.1329.533.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=lT2g_y4VYx0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=lT2g_y4VYx0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=lT2g_y4VYx0C&pg=PT7&dq=effective+javascript&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=lT2g_y4VYx0C&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript.html?hl=&id=lT2g_y4VYx0C"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript-sample-epub.acsm?id=lT2g_y4VYx0C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript-sample-pdf.acsm?id=lT2g_y4VYx0C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=lT2g_y4VYx0C&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "後者は、<b>JavaScript</b>のように柔軟で表現力の高い言語では、とくに洞察力が求め<br>\nられる課題であろう。これは<b>JavaScript</b>の実践に関する本だ。入門書ではない。<br>\n読者には、プログラミング一般、とくに<b>JavaScript</b>について、ある程度は馴染み<br>\nの&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "gg20DgAAQBAJ",
            "etag": "kepEeudbS58",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/gg20DgAAQBAJ",
            "volumeInfo": {
                "title": "Effective JavaScript 中文版(電子書)",
                "subtitle": "",
                "authors": [
                    "David Herman"
                ],
                "publisher": "碁峰資訊股份有限公司",
                "publishedDate": "2013-07-29",
                "description": "駕馭 JavaScript 的 68 個具體作法 JavaScript 發明人 Brendan Eich 專文推薦 「少有程式語言達人能夠像 David 這樣寫出流暢通順且措辭淺白的文字，透過其深邃的洞察力，他以引人入勝的方式帶我們逐一探索 JavaScript 的語法和語意，一路提醒我們要特別注意的事項，並以實際的使用案例來補充說明，步調和緩而舒適。讀完此書後，你會對 JavaScript 有更穩健且透徹的理解。」 —Paul Irish，Google Chrome 的開發人員大使 「這本書並不適合那些尋找捷徑的人，這是刻苦獲得的經驗所提煉出來的精華。它是少數我會毫不猶豫推薦的 JavaScript 書籍。」 —Alex Russell，TC39 成員、Google 軟體工程師 為了真正精通 JavaScript，你必須知道如何有效運用這個語言富有彈性又具表達能力的特色，以及知道如何避免其中常見的陷阱。不管你已經撰寫了多久的 JavaScript 程式碼，Effective JavaScript 都能增進你對這個強大語言的理解，讓你能夠建置更容易預測、更可靠且更容易維護的程式。 作者 David Herman 具有 Ecma 的 JavaScript 標準化委員會數年的工作經驗，他以前所未見的深度闡明這個語言的內部運作原理，幫助你完全掌握 JavaScript 強大的表達能力。立基於 JavaScript 最新的幾個版本，本書提供經過充分驗證的技巧以及最佳實務做法，協助你為未來的開發工作做好準備。 Effective JavaScript 是由 68 個經過驗證、能夠幫助你寫出更好的 JavaScript 程式碼的具體作法所構成，並輔以實例來闡述說明。你會學到如何為每個專案挑選適當的程式寫作風格、管理無法預料的問題，並以更良好的方式來處理 JavaScript 程式設計的各個面向，諸如資料結構或共時性（concurrency）。關鍵的特色包括： ■ 以更好的方式來使用基於原型（prototype）的物件導向程式設計 ■ 使用陣列與字典（dictionary）物件時可能遭遇到的細微問題以及它們的解法 ■ 對 JavaScript 函式與變數範疇（variable scoping）語意的精確且務實的解說 ■ 實用的 JavaScript 程式設計模式與慣用語法，例如選項物件（options objects）及方法鏈串（method chaining） ■ 深入介紹 JavaScript 獨特的「run-to-completion」共時模型 David Herman，Mozilla Research 的資深研究員。他是 Ecma TC39 的成員，這個委員會負責 JavaScript 的標準化工作。他擁有 Grinnell College 的電腦科學學士學位，以及 Northeastern University 的電腦科學碩士與博士學位。 #碁峰資訊 GOTOP Information Inc.",
                "industryIdentifiers": [{
                        "type": "ISBN_13",
                        "identifier": "9789862768921"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "9862768924"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 244,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=gg20DgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=gg20DgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "zh-CN",
                "previewLink": "http://books.google.com/books?id=gg20DgAAQBAJ&pg=PR3&dq=effective+javascript&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=gg20DgAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript_%E4%B8%AD%E6%96%87%E7%89%88_%E9%9B%BB%E5%AD%90%E6%9B%B8.html?hl=&id=gg20DgAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript_%E4%B8%AD%E6%96%87%E7%89%88_%E9%9B%BB%E5%AD%90%E6%9B%B8-sample-pdf.acsm?id=gg20DgAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=gg20DgAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "<b>Effective JavaScript</b> 的各界好評「完全符合 <b>Effective</b> Software Development 系列<br>\n程式設計書籍的高標準,對從事專業 <b>JavaScript</b> 程式設計工作的任何人來說,Dave <br>\nHerman 的 <b>Effective JavaScript</b> 都是必備的讀物。此書對於 <b>JavaScript</b> 內部運作<br>\n原理&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "yg0fBAAAQBAJ",
            "etag": "ZiNU147rE+4",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/yg0fBAAAQBAJ",
            "volumeInfo": {
                "title": "Effective JavaScript　JavaScriptを使うときに知っておきたい68の冴えたやり方",
                "authors": [
                    "Devid Herman"
                ],
                "publisher": "翔泳社",
                "publishedDate": "2013-02-18",
                "description": "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリーズに、満を持して登場！微妙な挙動に悩むプログラマや、よりシンプルで可読性に富んだコードを志向する開発者に、実践的で即効性のある処方を施してくれる1冊です。68の「なるほど！」は、伊達じゃない。",
                "industryIdentifiers": [{
                        "type": "ISBN_13",
                        "identifier": "9784798131115"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "4798131113"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 202,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "4.487.0.0.preview.1",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "ja",
                "previewLink": "http://books.google.com/books?id=yg0fBAAAQBAJ&pg=PA91&dq=effective+javascript&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=yg0fBAAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript_JavaScript%E3%82%92%E4%BD%BF%E3%81%86.html?hl=&id=yg0fBAAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=yg0fBAAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "項目34 メソッドをプロトタイプに格納しよう <b>JavaScript</b>でも、プロトタイプなし<br>\nでプログラミングすることは完全に可能である。項目30 のUserクラスは、その<br>\nプロトタイプで何も特別な定義をしなくても、次のように実装できそうだ。"
            }
        },
        {
            "kind": "books#volume",
            "id": "--gvDwAAQBAJ",
            "etag": "Iwqz2pnLrL4",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/--gvDwAAQBAJ",
            "volumeInfo": {
                "title": "An Effective Guide to Modern JavaScript",
                "subtitle": "(ECMAScript 2017 / ES 8)",
                "authors": [
                    "Chong Lip Phang"
                ],
                "publisher": "Chong Lip Phang",
                "publishedDate": "2017-08-08",
                "description": "ES8 was finalized in June 2017. This book: - effectively teaches standard JavaScript from A to Z. - includes all the JavaScript common APIs, presented in a highly organized fashion. - lists in the Appendix the new features introduced in each JavaScript edition from ES5 to ES8 and beyond, and illustrates all of them. - clearly explains advanced concepts such as closures, Proxy, generators, Promise, async functions, and Atomics. - covers OOP techniques -- classical JavaScript OOP, the new 'class' syntax, data encapsulation, multiple inheritance, abstract classes, object relay etc. - teaches you how to define and use iterators and various iterables. - turns you into an efficient JavaScript coder.",
                "industryIdentifiers": [{
                        "type": "ISBN_13",
                        "identifier": "9781974207923"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1974207927"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 127,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=--gvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=--gvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=--gvDwAAQBAJ&pg=PP1&dq=effective+javascript&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=--gvDwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/An_Effective_Guide_to_Modern_JavaScript.html?hl=&id=--gvDwAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/An_Effective_Guide_to_Modern_JavaScript-sample-pdf.acsm?id=--gvDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=--gvDwAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "This book: - effectively teaches standard JavaScript from A to Z. - includes all the JavaScript common APIs, presented in a highly organized fashion. - lists in the Appendix the new features introduced in each JavaScript edition from ES5 to ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "lLnefnWKhvIC",
            "etag": "QojXn6E5Wzg",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/lLnefnWKhvIC",
            "volumeInfo": {
                "title": "JavaScript Unleashed",
                "authors": [
                    "R. Allen Wyke"
                ],
                "publisher": "Sams Publishing",
                "publishedDate": "2000",
                "description": "This book presents focused explanations of the core features and complexities of JavaScript, including how to: Utilize the document object model ; Add visual effects to your Web page ; Implement JavaScript on the sever side ; Understand the JavaScript language objects, properties, and methods ; Use JavaScript to create dynamic HTML.",
                "industryIdentifiers": [{
                        "type": "ISBN_10",
                        "identifier": "067231763X"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9780672317637"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 996,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=lLnefnWKhvIC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=lLnefnWKhvIC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=lLnefnWKhvIC&q=effective+javascript&dq=effective+javascript&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=lLnefnWKhvIC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript_Unleashed.html?hl=&id=lLnefnWKhvIC"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=lLnefnWKhvIC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "10 Part I Even considering VBScript, JavaScript has emerged as the standard <br>\nWeb scripting language. ... If you have little background in HTML, you will <br>\ndiscover that, to be an <b>effective JavaScript</b> developer, you also need to learn the <br>\nins and&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "AgNVAgAAQBAJ",
            "etag": "SH70PH6+Ens",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/AgNVAgAAQBAJ",
            "volumeInfo": {
                "title": "Effective Awk Programming",
                "subtitle": "Text Processing and Pattern Matching",
                "authors": [
                    "Arnold Robbins"
                ],
                "publisher": "\"O'Reilly Media, Inc.\"",
                "publishedDate": "2001-05-23",
                "description": "Effective awk Programming,3rd Edition, focuses entirely onawk, exploring it in the greatest depth of the three awk titles we carry. It's an excellent companion piece to the more broadly focused second edition.This book provides complete coverage of the gawk 3.1 language as well as the most up-to-date coverage of the POSIX standard forawk available anywhere. Author Arnold Robbins clearly distinguishes standard awk features from GNU awk(gawk)-specific features, shines light into many of the \"dark corners\" of the language (areas to watch out for when programming), and devotes two full chapters to example programs. A brand new chapter is devoted to TCP/IP networking with gawk. He includes a summary of how the awk language evolved.The book also covers: Internationalization of gawk Interfacing to i18n at the awk level Two-way pipes TCP/IP networking via the two-way pipe interface The new PROCINFO array, which provides information about running gawk Profiling and pretty-printing awk programs In addition to covering the awk language, this book serves as the official \"User's Guide\" for the GNU implementation of awk (gawk), describing in an integrated fashion the extensions available to the System V Release 4 version of awk that are also available in gawk.As the official gawk User's Guide, this book will also be available electronically, and can be freely copied and distributed under the terms of the Free Software Foundation's Free Documentation License (FDL). A portion of the proceeds from sales of this book will go to the Free Software Foundation to support further development of free and open source software.The third edition of Effective awk Programming is a GNU Manual and is published by O'Reilly & Associates under the Free Software Foundation's Free Documentation License (FDL). A portion of the proceeds from the sale of this book is donated to the Free Software Foundation to further development of GNU software. This book is also available in electronic form; you have the freedom to modify this GNU Manual, like GNU software. Copies published by the Free Software Foundation raise funds for GNU development.",
                "industryIdentifiers": [{
                        "type": "ISBN_13",
                        "identifier": "9780596805371"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0596805373"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 450,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=AgNVAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=AgNVAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=AgNVAgAAQBAJ&pg=PA317&dq=effective+javascript&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=AgNVAgAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Effective_Awk_Programming.html?hl=&id=AgNVAgAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=AgNVAgAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "But there is one more subtlety in the <b>JavaScript</b> code. Each time the <b>JavaScript</b> <br>\ncode opens a window for the image, the name of the image is appended with a <br>\ntimestamp (systime). Why this constant change of name for the image? Initially, <br>\nwe&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "eBINBAAAQBAJ",
            "etag": "6lGA/AVshKU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/eBINBAAAQBAJ",
            "volumeInfo": {
                "title": "Programming Windows Store Apps with HTML, CSS, and JavaScript",
                "authors": [
                    "Kraig Brockschmidt"
                ],
                "publisher": "Microsoft Press",
                "publishedDate": "2014-07-18",
                "description": "Microsoft Press is pleased to offer the second edition of Kraig Brockschmidt's in-depth ebook on writing Windows Store apps using HTML, CSS3, and JavaScript on the Windows 8.1 platform. The ebook includes 20 chapters and 4 appendices. Download the PDF (30.1 MB) http://aka.ms/611111pdf Download the EPUB file (71.2 MB) http://aka.ms/611111epub Download the Mobi for Kindle file (113 MB) http://aka.ms/611111mobi Download Companion Files (132 MB) http://aka.ms/611111files",
                "industryIdentifiers": [{
                        "type": "ISBN_13",
                        "identifier": "9780735695702"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0735695709"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 1311,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "2.3.3.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=eBINBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=eBINBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=eBINBAAAQBAJ&pg=PA438&dq=effective+javascript&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=eBINBAAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Programming_Windows_Store_Apps_with_HTML.html?hl=&id=eBINBAAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=eBINBAAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "To accommodate this, Windows automatically scales down the <b>effective</b> <br>\nresolution that&#39;s reported to apps, which is to say that whatever coordinates you <br>\nuse within your app (in HTML, CSS, and <b>JavaScript</b>) are automatically scaled up <br>\nto the&nbsp;..."
            }
        },
        {
            "kind": "books#volume",
            "id": "haVQAAAAMAAJ",
            "etag": "l3v93fg/yD4",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/haVQAAAAMAAJ",
            "volumeInfo": {
                "title": "JavaScript Unleashed",
                "authors": [
                    "Richard Wagner"
                ],
                "publisher": "Sams",
                "publishedDate": "1997",
                "description": "This second edition provides the reader with a thorough understanding of the JavaScript scripting language. Using the provided examples and explanations, the reader will be able to apply his or her new JavaScript skills to the development of interactive content for the World Wide Web. The CD-ROM contains code from the book, sample applications, and third-party products.",
                "industryIdentifiers": [{
                    "type": "OTHER",
                    "identifier": "UOM:39015043102311"
                }],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 1014,
                "printType": "BOOK",
                "categories": [
                    "JavaScript (Computer program language)"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.3.1.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=haVQAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=haVQAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=haVQAAAAMAAJ&q=effective+javascript&dq=effective+javascript&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=haVQAAAAMAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript_Unleashed.html?hl=&id=haVQAAAAMAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=haVQAAAAMAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Along this line , most of the JavaScript objects have HTML tags that they <br>\nrepresent . If you have little background in HTML , you will discover that to be an <br>\n<b>effective JavaScript</b> developer , you also need to learn the ins and outs of HTML ."
            }
        }
    ]
}

let books = [{
        "id": "OXeMG8wNskc",
        "title": "metus hendrerit",
        "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
        "authors": [
            "Barbara Cartland"
        ],
        "publishedDate": 1999,
        "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
        "pageCount": 713,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
        "language": "en",
        "listPrice": {
            "amount": 109,
            "currencyCode": "EUR",
            "isOnSale": false
        }
    },
    {
        "id": "JYOJa2NpSCq",
        "title": "morbi",
        "subtitle": "lorem euismod dictumst inceptos mi",
        "authors": [
            "Barbara Cartland"
        ],
        "publishedDate": 1978,
        "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
        "pageCount": 129,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
        "language": "sp",
        "listPrice": {
            "amount": 44,
            "currencyCode": "EUR",
            "isOnSale": true
        }
    },
    {
        "id": "1y0Oqts35DQ",
        "title": "at viverra venenatis",
        "subtitle": "gravida libero facilisis rhoncus urna etiam",
        "authors": [
            "Dr. Seuss"
        ],
        "publishedDate": 1999,
        "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
        "pageCount": 972,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
        "language": "he",
        "listPrice": {
            "amount": 108,
            "currencyCode": "ILS",
            "isOnSale": false
        }
    },
    {
        "id": "kSnfIJyikTP",
        "title": "dictum",
        "subtitle": "augue eu consectetur class curabitur conubia ligula in ullamcorper",
        "authors": [
            "Danielle Steel"
        ],
        "publishedDate": 1978,
        "description": "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
        "pageCount": 303,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
        "language": "en",
        "listPrice": {
            "amount": 30,
            "currencyCode": "EUR",
            "isOnSale": true
        }
    },
    {
        "id": "f4iuVmbuKCC",
        "title": "sem himenaeos aptent",
        "subtitle": "interdum per habitasse luctus purus est",
        "authors": [
            "Dr. Seuss"
        ],
        "publishedDate": 2011,
        "description": "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
        "pageCount": 337,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
        "language": "sp",
        "listPrice": {
            "amount": 19,
            "currencyCode": "USD",
            "isOnSale": false
        }
    },
    {
        "id": "U2rfZO6oBZf",
        "title": "mi ante posuere",
        "subtitle": "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
        "authors": [
            "Leo Tolstoy"
        ],
        "publishedDate": 1978,
        "description": "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
        "pageCount": 748,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/1.jpg",
        "language": "en",
        "listPrice": {
            "amount": 91,
            "currencyCode": "USD",
            "isOnSale": true
        }
    },
    {
        "id": "xI0wrXaaAcq",
        "title": "non",
        "subtitle": "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
        "authors": [
            "Leo Tolstoy"
        ],
        "publishedDate": 2011,
        "description": "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
        "pageCount": 65,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
        "language": "he",
        "listPrice": {
            "amount": 90,
            "currencyCode": "USD",
            "isOnSale": false
        }
    },
    {
        "id": "9laHCEdSpFy",
        "title": "tristique",
        "subtitle": "consectetur a eu tincidunt condimentum amet nisi",
        "authors": [
            "Dr. Seuss"
        ],
        "publishedDate": 1999,
        "description": "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
        "pageCount": 299,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/11.jpg",
        "language": "he",
        "listPrice": {
            "amount": 176,
            "currencyCode": "EUR",
            "isOnSale": false
        }
    },
    {
        "id": "nGhVwZvGCGp",
        "title": "urna ornare gravida",
        "subtitle": "sem vestibulum semper convallis pharetra tempor himenaeos ut",
        "authors": [
            "Jin Yong"
        ],
        "publishedDate": 2011,
        "description": "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
        "pageCount": 803,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
        "language": "sp",
        "listPrice": {
            "amount": 116,
            "currencyCode": "USD",
            "isOnSale": true
        }
    },
    {
        "id": "Q8Q9Lsd03BD",
        "title": "consequat neque volutpat",
        "subtitle": "vel quis taciti fermentum feugiat ullamcorper curae praesent",
        "authors": [
            "Dr. Seuss"
        ],
        "publishedDate": 1978,
        "description": "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
        "pageCount": 891,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/5.jpg",
        "language": "en",
        "listPrice": {
            "amount": 145,
            "currencyCode": "EUR",
            "isOnSale": false
        }
    },
    {
        "id": "bd7a76kARao",
        "title": "risus",
        "subtitle": "pretium bibendum pharetra curabitur quisque dictumst",
        "authors": [
            "Danielle Steel"
        ],
        "publishedDate": 2018,
        "description": "auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus",
        "pageCount": 86,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
        "language": "sp",
        "listPrice": {
            "amount": 157,
            "currencyCode": "ILS",
            "isOnSale": true
        }
    },
    {
        "id": "qKyG0vqeO3e",
        "title": "interdum etiam vulputate",
        "subtitle": "velit sapien eget tincidunt nunc tortor",
        "authors": [
            "Danielle Steel"
        ],
        "publishedDate": 2018,
        "description": "aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad",
        "pageCount": 882,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/17.jpg",
        "language": "sp",
        "listPrice": {
            "amount": 57,
            "currencyCode": "USD",
            "isOnSale": true
        }
    },
    {
        "id": "2RvT48ZNInj",
        "title": "sagittis justo",
        "subtitle": "etiam primis proin praesent placerat nisi fermentum nisi",
        "authors": [
            "Agatha Christie"
        ],
        "publishedDate": 2011,
        "description": "nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus",
        "pageCount": 598,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/8.jpg",
        "language": "en",
        "listPrice": {
            "amount": 167,
            "currencyCode": "ILS",
            "isOnSale": false
        }
    },
    {
        "id": "5z2s9pDXAYj",
        "title": "quam ullamcorper himenaeos",
        "subtitle": "ut placerat eu dapibus sapien sodales laoreet",
        "authors": [
            "Danielle Steel"
        ],
        "publishedDate": 1999,
        "description": "etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam",
        "pageCount": 608,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/3.jpg",
        "language": "he",
        "listPrice": {
            "amount": 150,
            "currencyCode": "USD",
            "isOnSale": true
        }
    },
    {
        "id": "zBZu5cDEWha",
        "title": "quis",
        "subtitle": "suscipit turpis etiam turpis libero lobortis",
        "authors": [
            "Jin Yong"
        ],
        "publishedDate": 2011,
        "description": "etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor",
        "pageCount": 583,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/6.jpg",
        "language": "en",
        "listPrice": {
            "amount": 58,
            "currencyCode": "ILS",
            "isOnSale": true
        }
    },
    {
        "id": "aOI7tQuPZ2f",
        "title": "aliquam aliquet dapibus",
        "subtitle": "neque eu purus euismod placerat adipiscing odio egestas consequat",
        "authors": [
            "Leo Tolstoy"
        ],
        "publishedDate": 2011,
        "description": "dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt",
        "pageCount": 497,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/7.jpg",
        "language": "en",
        "listPrice": {
            "amount": 78,
            "currencyCode": "USD",
            "isOnSale": false
        }
    },
    {
        "id": "WBooB82Uvwu",
        "title": "class",
        "subtitle": "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
        "authors": [
            "Danielle Steel"
        ],
        "publishedDate": 1999,
        "description": "rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla",
        "pageCount": 804,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
        "language": "en",
        "listPrice": {
            "amount": 118,
            "currencyCode": "ILS",
            "isOnSale": false
        }
    },
    {
        "id": "xm1z5bbZjlS",
        "title": "vitae",
        "subtitle": "class habitant at commodo semper ligula a bibendum",
        "authors": [
            "Leo Tolstoy"
        ],
        "publishedDate": 1999,
        "description": "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
        "pageCount": 231,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
        "language": "he",
        "listPrice": {
            "amount": 60,
            "currencyCode": "EUR",
            "isOnSale": false
        }
    },
    {
        "id": "u3j6QIKLlJb",
        "title": "rhoncus vivamus",
        "subtitle": "nullam class risus amet senectus scelerisque etiam curabitur",
        "authors": [
            "Agatha Christie"
        ],
        "publishedDate": 1978,
        "description": "torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis",
        "pageCount": 652,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
        "language": "he",
        "listPrice": {
            "amount": 110,
            "currencyCode": "USD",
            "isOnSale": true
        }
    },
    {
        "id": "vxYYYdVlEH3",
        "title": "donec mi ullamcorper",
        "subtitle": "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
        "authors": [
            "William Shakespeare"
        ],
        "publishedDate": 2011,
        "description": "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
        "pageCount": 904,
        "categories": [
            "Computers",
            "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
        "language": "sp",
        "listPrice": {
            "amount": 186,
            "currencyCode": "ILS",
            "isOnSale": true
        }
    }
]