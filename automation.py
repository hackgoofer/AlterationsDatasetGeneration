from selenium import webdriver
import time
import random
import math
import json

# Utility Methods
def random_number(mmin, mmax, step):
    delta = mmax - mmin + step
    rrange = delta / step
    rand = random.random()
    rand *= rrange
    rand = math.floor(rand)
    rand *= step
    rand += mmin
    return float("{:.2f}".format(rand))

##



## Leaves Code
def get_params_leaves(vc, name_val):
    static = static_params_leaves()
    dynamic = dynamic_params_leaves()
    seed = random.randint(0, 10000000)
    random.seed(seed)
    params = {"seed": seed}

    for name, val in dynamic.items():
        mmin = dynamic[name][0]
        mmax = dynamic[name][1]
        step = dynamic[name][2]
        rand = random_number(mmin, mmax, step)
        params[name] = rand
        if name == "numColumns":
            gridWidth = rand
        if name == "numRows":
            gridHeight = rand

    assert gridWidth != None and gridHeight != None

    dependent = dependent_params_leaves(gridWidth, gridHeight)
    for name, val in dependent.items():
        val = int(val)
        params[name] = [random.random() for _ in range(val)]

    params["verticalSize"] = vc
    params["name"] = name_val
    return params

def static_params_leaves():
    return {'verticalSize': [0.01, 1, 0.01]}

def dynamic_params_leaves():
    return {
        # take the form of alteration_name: [min, max, optional_step]
        "palette": [0, 12, 1],
        "numColumns": [1, 50, 1],
        "numRows": [1, 50, 1],
        "gridNoise": [0, 1, 0.05],
        "offsetLeft": [-1, 1, 0.05],
        "offsetRight": [-1, 1, 0.05],
        "drop": [0, 0.95, 0.05],
        "edgeColor": [0, 4, 1],
        "strokeWidth": [0, 6, 0.2],
        "cid": [0, 1, 0.1]
    }

def dependent_params_leaves(width, height):
    return {
        "mux": width*height,
        "muy": width*height,
        "check": width*height,
        "check_drop": width*height,
        "cids": width*height,
        "muy2": width*height,
        "mux_w": width,
        "muy_w": width
    }


driver = webdriver.Chrome("/Users/sash/local/chromedriver")
driver.get("localhost:8000/generation.html")
time.sleep(2)
for i in range(10):
    params = get_params_leaves(0.25, "_A")
    params_str = json.dumps(params)
    driver.execute_script(f"start({params_str})")
    time.sleep(2)
    driver.refresh()
    time.sleep(2)

    params["verticalSize"] = 0.35
    params["name"] = "_B"
    params_str = json.dumps(params)
    driver.execute_script(f"start({params_str})")
    time.sleep(4)
    driver.refresh()
    print(f"Done round {i} of 10")
