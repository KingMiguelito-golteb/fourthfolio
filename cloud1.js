const containerElement = document.getElementById('container')
containerElement.innerHTML = `
<div class="cloud">
    <div class="cloudBubble1"></div>
    <div class="cloudBubble2"></div>
</div>`.repeat(20)

const elements = document.getElementsByClassName('cloud');
for (let j = 0; j < elements.length; j++) {
    const element = elements[j];

    element.style.top = (Math.random() * 100) + '%'
    element.style.left = (Math.random() * 100) + '%'
    element.style.transform = "scale(" + ((Math.random() * 0.7) + 0.3) + ")"

    const intervalTimeInSeconds = (Math.random() * 20) + 6
    element.style.transition = "all linear " + intervalTimeInSeconds + "s"

    const startRight = Math.random() > 0.5

    setTimeout(() => {
        element.style.left = startRight ? '100%' : '-50%'
    }, [1000])

    i = startRight ? 1 : 0
    setInterval(() => {
        if (i % 2 === 0) {
            element.style.left = '100%'
        } else {
            element.style.left = '-50%'
        }
        i += 1
    }, intervalTimeInSeconds * 1000)
}
