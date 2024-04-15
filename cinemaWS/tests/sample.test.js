describe('describe', () => {
    test("1+1=2", async () => {
        const data = await login()
        expect(1+1).toBe(2)
    });
})