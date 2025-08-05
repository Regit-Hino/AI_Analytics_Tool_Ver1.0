// 最終テスト
const GAS_URL = 'https://script.google.com/macros/s/AKfycbziuZzkU3S0c_DZKmVrfIRV9YR4U_8EDQR6Ggkq8qcX792IeEcC9Hiyq2OdoK53cc3rPw/exec';

const testData = {
    timestamp: new Date().toISOString(),
    company: "最終確認テスト株式会社",
    industry: "IT",
    headcount: "101-500",
    name: "最終テスト 太郎",
    email: "final-test@example.com",
    answers: {
        "q1": 2,
        "q2": 1,
        "q3": 0,
        "q4": 1,
        "q5": 2,
        "q6": 1,
        "q7": 0,
        "q8": 1,
        "q9": 2,
        "q10": 0,
        "q11": 1,
        "q12": 1,
        "q13": 2,
        "q14": 1,
        "q15": 2
    },
    total_score: 78,
    tier: "★★"
};

console.log('=== 最終テスト実行 ===');
console.log('送信データ:');
console.log('- 会社名:', testData.company);
console.log('- 名前:', testData.name);
console.log('- 時刻:', testData.timestamp);
console.log('');

// 3つの方法で送信
async function runFinalTest() {
    // 方法1
    try {
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(testData),
        });
        console.log('✓ 方法1: JSON送信完了');
    } catch (error) {
        console.error('✗ 方法1エラー:', error.message);
    }

    // 方法2
    try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(testData));
        
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
        });
        console.log('✓ 方法2: FormData送信完了');
    } catch (error) {
        console.error('✗ 方法2エラー:', error.message);
    }

    // 方法3
    try {
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(testData));
        
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: params,
        });
        console.log('✓ 方法3: URLParams送信完了');
    } catch (error) {
        console.error('✗ 方法3エラー:', error.message);
    }

    console.log('');
    console.log('🎉 テスト送信完了！');
    console.log('');
    console.log('📋 スプレッドシートで確認してください:');
    console.log('   会社名: 最終確認テスト株式会社');
    console.log('   名前: 最終テスト 太郎');
}

runFinalTest();