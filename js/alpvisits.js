const counters = document.querySelectorAll('.container');
const speed = 500; // The lower the slower

    const updateCount = () => {
    //	const counter = document.querySelector("h1");
    //	const target = +document.querySelector("h1").getAttribute('data-target');

    const counter = document.getElementById("alpvisits");
    const target = +document.getElementById("alpvisits").getAttribute('data-target');
    	const count = +counter.innerText;

        // Lower inc to slow and higher to slow
        const inc = target / speed;

        // console.log(inc);
        // console.log(count);

        // Check if target is reached
        if (count < target) {
            // Add inc to count and output in counter
            counter.innerText = count + inc;
            // Call function every ms
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
