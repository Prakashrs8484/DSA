function solveRobbery() {
    const input = document.getElementById('houses').value;
    const houses = input.split(',').map(Number);
    const result = rob(houses);
    document.getElementById('result').innerText = `Maximum amount that can be robbed: ${result.amount}`;
    animateRobbery(result.robbedHouses, houses);
}

function rob(nums) {
    if (nums.length === 0) return { amount: 0, robbedHouses: [] };
    if (nums.length === 1) return { amount: nums[0], robbedHouses: [0] };
    if (nums.length === 2) return { amount: Math.max(nums[0], nums[1]), robbedHouses: [nums[0] > nums[1] ? 0 : 1] };

    let dp = Array(nums.length).fill(0);
    let choices = Array(nums.length).fill(null);
    
    dp[0] = nums[0];
    choices[0] = [0];
    dp[1] = Math.max(nums[0], nums[1]);
    choices[1] = nums[0] > nums[1] ? [0] : [1];

    for (let i = 2; i < nums.length; i++) {
        if (nums[i] + dp[i - 2] > dp[i - 1]) {
            dp[i] = nums[i] + dp[i - 2];
            choices[i] = [...choices[i - 2], i];
        } else {
            dp[i] = dp[i - 1];
            choices[i] = [...choices[i - 1]];
        }
    }

    return { amount: dp[nums.length - 1], robbedHouses: choices[nums.length - 1] };
}

function animateRobbery(robbedHouses, houses) {
    const housesContainer = document.getElementById('houses-container');
    const robber = document.getElementById('robber');
    const scoreElement = document.getElementById('score');
    housesContainer.innerHTML = '';
    let score = 0;
    scoreElement.innerText = score;
    
    houses.forEach((value, index) => {
        const houseElement = document.createElement('div');
        houseElement.className = 'house';
        houseElement.innerHTML = `<img src="house.jpg" alt="House"><div class="value">${value}</div>`;
        housesContainer.appendChild(houseElement);
    });

    robbedHouses.forEach((houseIndex, i) => {
        setTimeout(() => {
            const houseElements = document.getElementsByClassName('house');
            const housePosition = houseElements[houseIndex].offsetLeft;
            const houseTop = houseElements[houseIndex].offsetTop;
            robber.style.transform = `translate(${housePosition}px, ${houseTop - 90}px)`;  // Adjust the top position as needed
            setTimeout(() => {
                houseElements[houseIndex].classList.add('robbed');
                score += houses[houseIndex];
                animateScoreUpdate(scoreElement, score);
            }, 1000);
        }, i * 2000);
    });
}

function animateScoreUpdate(scoreElement, score) {
    scoreElement.style.transform = 'scale(1.5)';
    scoreElement.style.opacity = '0.5';
    setTimeout(() => {
        scoreElement.innerText = score;
        scoreElement.style.transform = 'scale(1)';
        scoreElement.style.opacity = '1';
    }, 300);
}
